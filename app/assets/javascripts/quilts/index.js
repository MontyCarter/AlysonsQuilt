
    // get filler squares
    //   -- build object with:
    //      -- img src for square
    // process regular squares
    // create divs with inner images
    //   -- thumbnail
    //   -- signature?
    // set up modals
    //   -- video/photo
    //   -- message
    //   -- signature


function quilts_index() {

    NUM_FILLER_SQUARES = 10;

    function build_filler_squares(num) {

	squares = [];

	for (i = 0; i < num; i++) {
	    
	    // Choose random pattern index
	    idx = Math.floor((Math.random() * NUM_FILLER_SQUARES) + 1); 

	    // Build new square
	    squares.push(
		{
		    type: 'filler',
		    url: '/patterns/medium/' + idx.toString() + '.png'
		});
	}

	return squares;
    }

    function setup_quilt(data, textStatus, jqXHR) {

	real_squares = data;
	
	// Add type = 'real' to real squares
	for (i = 0; i < real_squares.length; i++)
	    real_squares[i][type] = 'real';

	// Build filler squares (multiples of 5, at least 5)
	num_fillers = Math.ceil((real_squares.length + 5) / 5);
	filler_squares = build_filler_squares(num_fillers);

	

	$('#quilt-main').html('<p>f' + data.length + 'e</p>');

    }

    function handle_failure(jqXHR, textStatus, errorThrown) {

	$('#quilt-main').html('<p>Failed!</p>');

    }

    $.get('/squares')
    .done( setup_quilt )
    .fail( handle_failure );

    // $('.grid').imagesLoaded().done( function(instance) {

    // 	$('.grid').masonry({

    // 	    itemSelector: '.grid-item',
    // 	    columnWidth: '.grid-sizer',
    // 	    percentPosition: true

    // 	})

    // 	$(window).resize(function() {

    // 	    $('.grid').masonry();

    // 	});

    // });


}

