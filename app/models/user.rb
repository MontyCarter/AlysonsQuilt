class User < ActiveRecord::Base

  # Join tables
  has_and_belongs_to_many :squares

end
