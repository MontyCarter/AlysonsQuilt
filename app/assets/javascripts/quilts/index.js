
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

    function init_masonry() {

	$('.grid').imagesLoaded().done( function(instance) {

	    $grid = $('.grid')

	    // Masonry seems limited in that you have to display
	    // the images for it to lay things out.
	    $grid.show();

	    // Do the layout
	    $grid.masonry({
		// square containers
		itemSelector: '.grid-item',
		// for sizing:
		columnWidth: '.grid-sizer',
		// use percentages for grid column widths (see css)
		percentPosition: true
	    });

	    $(window).resize(function() {

		$grid.masonry();

		// todo: resize images?

	    });

	});
    }

    function build_quilt(squares) {

	var html = '<div class="grid" style="display:none;">';
	html +=        '<div class="grid-sizer"></div>';
	
	for (var i = 0; i < squares.length; i++)
	    html += squares[i].build_square_div();

	html += '</div>';
	
	$('#quilt-main').html(html);

    }

    function build_filler_square_div() {
	var str = '<div class="grid-item">' +
	    '<img src="' + this.media_medium_url + '" alt="pattern" />' +
	    '</div>';
	return str;
    }

    function build_filler_squares(num) {

	var squares = [];

	for (var i = 0; i < num; i++) {
	    
	    // Choose random pattern index
	    var idx = Math.floor((Math.random() * NUM_FILLER_SQUARES)); 

	    // Build new square
	    squares.push(
		{
		    media_small_url: '/patterns/small/' + 
			idx.toString() + '.png',
		    media_medium_url: '/patterns/medium/' + 
			idx.toString() + '.png',
		    media_large_url: '/patterns/large/' + 
			idx.toString() + '.png',
		    build_square_div: build_filler_square_div
		});
	}

	return squares;
    }

    function setup_quilt(data, textStatus, jqXHR) {

	var real_squares = data;
	
	// Add fields to real squares
	for (var i = 0; i < real_squares.length; i++) {
	    real_squares[i][build_square_div] = build_real_square_div;
	}

	// Build filler squares (multiples of 5, at least 5)
	var num_fillers = 20 * Math.ceil((real_squares.length + 5) / 5);
	var filler_squares = build_filler_squares(num_fillers);

	// Build quilt with all squares
	build_quilt(real_squares.concat(filler_squares));

	// Initialize masonry library
	init_masonry();

	// Done!
    }

    function handle_failure(jqXHR, textStatus, errorThrown) {

	$('#quilt-main').html('<p>Failed!</p>');

    }

    $.get('/squares')
    .done( setup_quilt )
    .fail( handle_failure );

}

