##
# This services the main page, http://host.com/
class QuiltsController < ApplicationController

  ##
  # Display the main page.
  def index
    @squares = Square.all
  end

end
