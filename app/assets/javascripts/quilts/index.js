
function quilts_index() {

    var NUM_FILLER_SQUARES = 10;

    var REAL_SQUARES = [ ]; // set in setup_quilt

    function init_masonry() {

	$('.grid').imagesLoaded().done( function(instance) {

	    $grid = $('.grid')

	    // Masonry seems limited in that you have to display
	    // the images for it to lay things out (even though
	    // they have a 'layout complete' event, doesn't seem
	    // to work correctly).
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

    function setup_real_square_js() {

	// On click show the modal
	$('.real-square').click(function() {

	    // Look up the square, using the index
	    var idx = Number($(this).data('square-idx'))
	    var square = REAL_SQUARES[idx]

	    // Set the modal's title, media, and message
	    $('#square-modal-title').html('From: ' + square.signature);

	    if (square['video?']) {
		$('#square-modal-media').html(
			'<video id="square-modal-video" controls="">' +
			'<source src="' + square.media_url + '">' +
			'Your browser does not support the video tag.' +
			'</video>'
		);
	    } else {
		$('#square-modal-media').html(
		    '<img class="img-responsive" src="' + square.media_url + '" alt="media" />');
	    }

	    $('#square-modal-message').html(square.message);

	    // Show the modal
	    $('#square-modal').modal('show');

	});

    }

    function setup_modal() {
	
	$('#square-modal-close-bottom').click(function() {

	    // Pause video when closing modal
	    if ($('#square-modal-video').length > 0) {

		$('#square-modal-video')[0].pause();

	    }

	    // Close modal
	    $('#square-modal').modal('hide');

	});

	$('#square-modal-close-top').click(function() {

	    // Pause video when closing modal
	    if ($('#square-modal-video').length > 0) {

		$('#square-modal-video')[0].pause();

	    }

	    // Close modal
	    $('#square-modal').modal('hide');

	});

    }

    function shuffle(o){
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), 
	    x = o[--i], o[i] = o[j], o[j] = x);
	return o;
    }

    function build_quilt(squares) {

	squares = shuffle(squares);

	var html = '<div class="grid" style="display:none;">';
	html +=        '<div class="grid-sizer"></div>';
	
	for (var i = 0; i < squares.length; i++)
	    html += squares[i].build_square_div();

	html += '</div>';
	
	$('#quilt-main').html(html);

	setup_real_square_js();

	setup_modal();

    }

    function build_filler_square_div() {
	var str = '<div class="grid-item">' +
	    '<img src="' + this.media_medium_url + '" alt="pattern" />' +
	    '</div>';
	return str;
    }

    function build_real_square_div() {
	var str = '<div class="grid-item real-square" ' +
	    'data-square-idx="' + this.square_idx + '">' +
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

	REAL_SQUARES = data;
	
	// Add fields to real squares
	for (var i = 0; i < REAL_SQUARES.length; i++) {
	    REAL_SQUARES[i]['build_square_div'] = build_real_square_div;
	    REAL_SQUARES[i]['square_idx'] = i;
	}

	// Build filler squares (multiples of 5, at least 5)
	var num_fillers = 10 * Math.ceil((REAL_SQUARES.length + 5) / 5);
	var filler_squares = build_filler_squares(num_fillers);

	// Build quilt with all squares
	build_quilt(REAL_SQUARES.concat(filler_squares));

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

