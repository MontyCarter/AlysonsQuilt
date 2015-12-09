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
        squares.as_json(only: [:message, :signature],
                        methods: [:media_small_url,
                                  :media_medium_url,
                                  :media_large_url,
                                  :media_url])
      }
    end
  end

  def new
    # Make a new square for the form (doesn't save to db)
    @square = Square.new
  end

  def create
    @square = Square.new(square_params)
    respond_to do |format|
      if @square.save
        format.html { redirect_to square_path(@square.id) }
      else
        @errors = @square.errors.full_messages
        format.html { render action: :new }
      end
    end
  end

  def show
    @square = Square.find(params[:id])
  end

  # --------------------------------------------------

  private

  def square_params
    params.require(:square).permit(:message, :signature, :media)
  end

end
