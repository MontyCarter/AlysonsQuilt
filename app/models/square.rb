class Square < ActiveRecord::Base

  # Square media (photo or video)
  has_attached_file(:media,
                    :path => Rails.configuration.x.paperclip_path,
                    :url  => Rails.configuration.x.paperclip_url,
                    :styles => { 
                      small: '100x100#',
                      medium: '200x200#',
                      large: '300x300#' })

  def media_small_url:
      self.media.url(:small)
  end

  def media_medium_url:
      self.media.url(:medium)
  end

  def media_large_url:
      self.media.url(:large)
  end

  def media_url:
      self.media.url
  end

end
