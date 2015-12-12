class Square < ActiveRecord::Base

  # Square media (photo or video)
  has_attached_file(:media,
                    :path => Rails.configuration.x.paperclip_path,
                    :url  => Rails.configuration.x.paperclip_url,
                    :styles => { 
                      small:  '100',  # width = 100, height = preserve ratio
                      medium: '200',  # ditto
                      large:  '300',  # ditto
                      original_no_exif: ''},
                    :processors => lambda { |a| 
                      a.video? ? [:video_thumbnail] : [:thumbnail]
                    },
                    convert_options: { all: '-strip' }
                    )

  validates :signature, presence: true
  validates_attachment(:media, presence: true,
                       content_type: { content_type: /\A((image\/.*)|(video\/.*))\Z/ },
                       size: { in: 0..100.megabytes })

  def media_small_url
      self.media.url(:small)
  end

  def media_medium_url
      self.media.url(:medium)
  end

  def media_large_url
      self.media.url(:large)
  end

  def media_url
    if video?
      self.media.url
    else
      self.media.url(:original_no_exif)
    end
  end

  def video?
    [ 'application/x-mp4',
      'video/mpeg',
      'video/quicktime',
      'video/x-la-asf',
      'video/x-ms-asf',
      'video/x-msvideo',
      'video/x-sgi-movie',
      'video/x-flv',
      'flv-application/octet-stream',
      'video/3gpp',
      'video/3gpp2',
      'video/3gpp-tt',
      'video/BMPEG',
      'video/BT656',
      'video/CelB',
      'video/DV',
      'video/H261',
      'video/H263',
      'video/H263-1998',
      'video/H263-2000',
      'video/H264',
      'video/JPEG',
      'video/MJ2',
      'video/MP1S',
      'video/MP2P',
      'video/MP2T',
      'video/mp4',
      'video/MP4V-ES',
      'video/MPV',
      'video/mpeg4',
      'video/mpeg4-generic',
      'video/nv',
      'video/parityfec',
      'video/pointer',
      'video/raw',
      'video/rtx' ].include?(self.media_content_type)
  end

end
