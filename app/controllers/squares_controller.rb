##
# Handles routes to ROOT/squares
class SquaresController < ApplicationController

  def index
    #
    # Get all squares
    #
    squares = Square.all
    #
    # Send back squares and associated users as json
    #
    respond_to do |format|
      format.json { render :json => 
        #
        # Return everything in a squares and associated users, 
        # except created/updated at
        #
        squares.as_json(except: [:created_at, :updated_at],
                        include: 
                        { users: 
                          { except: [:created_at, :updated_at] }
                          })
      }
    end
  end

end
