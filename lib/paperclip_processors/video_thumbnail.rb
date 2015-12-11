#
# Adapted from:
#
#   https://thewebfellas.com/blog/video-thumbnails-with-ffmpeg-and-paperclip
#

module Paperclip
  class VideoThumbnail < Processor

    # integer: offset into video clip (e.g., 4 = 4 seconds)
    #          default: 4 seconds
    attr_accessor :time_offset 
    # string:  width of thumbnail, e.g. '100'. Should be even (and will
    #          be converted if not). The height is chosen to preserve
    #          the aspect ratio.
    attr_accessor :geometry
    # boolean: whether or not to show errors from thumbnail generation
    #          default: true
    attr_accessor :whiny

    ##
    # options: See accessors above
    def initialize(file, options = {}, attachment = nil)
      super

      # Timer offset: we must use itsoffset command line argument
      # for ffmpeg (not sure why). This offset is how long to 'delay'
      # playing back the movie before taking a snapshot. Not sure
      # how else to explain this, but the offset must be negated.
      @time_offset = "-#{options[:time_offset] || 4}"

      # Geometry: ensure dimensions are even
      unless options[:geometry].nil? || 
          (@geometry = Geometry.parse(options[:geometry])).nil?
        
        # Force width to even value
        @geometry.width = (@geometry.width / 2.0).floor * 2.0

        # Don't allow height or modifier (e.g., '#', '>', etc., these
        # are not supported by ffmpeg, they're convert flags)
        if @geometry.height > 0 || @geometry.modifier
          raise Paperclip::Error, "Unsupported geometry #{@geometry.height} #{@geometry.modifier} for video thumbnailing."
        end
      end

      # Whiny
      @whiny = options[:whiny].nil? ? true : options[:whiny]
      
      # Get name of file without suffix (e.g., remove .mpeg)
      @basename = File.basename(file.path, File.extname(file.path))
    end

    def make

      # Create temporary file for thumbnail
      dst = Tempfile.new([@basename, 'png'].compact.join("."))
      dst.binmode

      # Build commandline for ffmpeg
      cmd = %Q[-i "#{File.expand_path(file.path)}" -itsoffset #{time_offset} -y -vframes 1 -f rawvideo -vcodec png ]
      cmd << " -vf scale=#{geometry.to_s}:-1 " unless geometry.nil?
      cmd << %Q["#{File.expand_path(dst.path)}"]

      # Build thumbnail
      begin
        success = Paperclip.run('avconv', cmd)
      rescue Paperclip::Error
        raise Paperclip::Error, "There was an error processing the thumbnail for #{@basename}" if whiny
      end
      
      # Return thumbnail
      dst
    end
  end
end
