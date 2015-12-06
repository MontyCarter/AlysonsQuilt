class User < ActiveRecord::Base

  # Accessors
  attr_accessor :first_name 
  attr_accessor :last_name 

  # Join tables
  has_and_belongs_to_many :squares

end
