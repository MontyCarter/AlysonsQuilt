class Square < ActiveRecord::Base

  # Join tables
  has_and_belongs_to_many :users

  # Used in the new square form
  accepts_nested_attributes_for :users

  # Attachments
  has_attached_file(:photo,       
                    path: Rails.configuration.x.paperclip_path,
                    url: Rails.configuration.x.paperclip_url,
                    styles: { small: '100x100#',
                              medium: '200x200#',
                              large:  '500x500#'},
                    )
                              
  has_attached_file(:video,
                    path: Rails.configuration.x.paperclip_path,
                    url: Rails.configuration.x.paperclip_url)
                    
  has_attached_file(:video_thumb, 
                    path: Rails.configuration.x.paperclip_path,
                    url: Rails.configuration.x.paperclip_url)

  # --------------------------------------------------

  def photo_thumb_url
    photo.url(:small)
  end

  def photo_url
    photo.url
  end

  def video_thumb_url
    video_thumb.url
  end

  def video_url
    video.url
  end

end
