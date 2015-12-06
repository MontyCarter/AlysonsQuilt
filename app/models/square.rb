class Square < ActiveRecord::Base

  # Accessors
  attr_accessor :message

  # Join tables
  has_and_belongs_to_many :users
  has_attachment :photo
  has_attachment :video

end
