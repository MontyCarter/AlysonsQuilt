class Square < ActiveRecord::Base

  # Join tables
  has_and_belongs_to_many :users
  has_attached_file :photo, path: Rails.configuration.x.paperclip_path
  has_attached_file :video, path: Rails.configuration.x.paperclip_path

end
