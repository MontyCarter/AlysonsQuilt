
function quilts_index() {

    /* -------------------- "Globals" -------------------- */

    var NUM_FILLER_SQUARES = 10;

    var REAL_SQUARES = [ ]; // set in setup_quilt

    /* 
     * These correspond to the bootstrap size classes (e.g., col-md)
     * See: http://getbootstrap.com/css/#grid-media-queries
     */
    var SM_VIEWPORT_SZ = 768;
    var MD_VIEWPORT_SZ = 992;
    var LG_VIEWPORT_SZ = 1200;

    /* -------------------- Functions -------------------- */

    function init_masonry() {

	$('.grid').imagesLoaded().always( function(instance) {

	    $grid = $('.grid')

	    // Do the layout
	    $grid.masonry({
		// square containers
		itemSelector: '.grid-item',
		// for sizing:
		columnWidth: '.grid-sizer',
		// use percentages for grid column widths (see css)
		percentPosition: true
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
	    $('#square-modal-title').html(square.signature);

	    if (square['video?']) {

		$('#square-modal-media-spinner').hide();

		$('#square-modal-media').html(
			'<video class="img-responsive" id="square-modal-video" controls="">' +
			'<source src="' + square.media_url + '">' +
			'Your browser does not support the video tag.' +
			'</video>'
		);

	    } else {

		$('#square-modal-media-spinner').show();

		$('#square-modal-media').html(
		    '<img class="img-responsive" src="' + square.media_url + '" alt="media" id="square-modal-media-img" style="display:none;" />');

		$('#square-modal-media').imagesLoaded(function() {

		    $('#square-modal-media-spinner').hide();

		    $('#square-modal-media-img').show();

		});

	    }

	    if (square.message && square.message != "") {

		// Insert message into <p>
		$('#square-modal-message').html(square.message);
		
		// Make sure message shows up (may have been hidden from
		// prior square view that had a null/blank message)
		$('#square-modal-message-div').show();

	    } else {

		// Hide message div, no message to show
		$('#square-modal-message-div').hide();

	    }


	    // Show the modal
	    $('#square-modal').modal('show');

	});

    }

    function setup_modal() {

	// Attach click handlers on close buttons
	$('#square-modal-close-bottom').click(function() {

	    // Close modal
	    $('#square-modal').modal('hide');

	});

	$('#square-modal-close-top').click(function() {

	    // Close modal
	    $('#square-modal').modal('hide');

	});

	// Attach event handler on modal hide (so we can handle
	// case when user clicks/taps outside modal to close it)
	$('#square-modal').on('hidden.bs.modal', function (e) {

	    // If we're running a video, make sure we pause it
	    if ($('#square-modal-video').length > 0) {

		$('#square-modal-video')[0].pause();

	    }

	});

    }

    function show_img_load_progress(num_squares) {

	var img_count = 0;

	$('.grid').imagesLoaded().progress(function(imgLoad, image) {

	    $container = $(image.img).parent();

	    $container.removeClass('is-loading');
	    
	    if (!image.isLoaded) {

		$container.addClass('is-broken');

	    }

	    img_count++;

	    var percent_complete = Math.ceil((img_count / num_squares) * 100);

	    $('#quilt-progress-bar').css(
		{width: (percent_complete.toString() + '%')});

	    if (img_count == num_squares) {
	    	$('#quilt-progress').hide();
	    }

	});

    }

    function shuffle(o){
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), 
	    x = o[--i], o[i] = o[j], o[j] = x);
	return o;
    }

    function build_quilt(squares) {

	squares = shuffle(squares);

	var html = '<div class="grid">';
	html +=        '<div class="grid-sizer"></div>';
	
	for (var i = 0; i < squares.length; i++)
	    html += squares[i].build_square_div();

	html += '</div>';
	
	$('#quilt-main').html(html);

	show_img_load_progress(squares.length);

	setup_real_square_js();

	setup_modal();

    }

    function thumbnail_url(square_obj) {
	var viewport_sz = $(window).width();

	if (viewport_sz < MD_VIEWPORT_SZ) {

	    /* Lump extra small and small into one */
	    return square_obj.media_small_url;

	} else if (viewport_sz < LG_VIEWPORT_SZ) {

	    return square_obj.media_medium_url;

	} else { 

	    return square_obj.media_large_url;

	}
    }

    function build_filler_square_div() {
	var str = '<div class="grid-item is-loading">' +
	    '<img class="img-responsive" src="' + thumbnail_url(this) + '" alt="pattern" />' +
	    '</div>';
	return str;
    }

    function build_real_square_div() {

	var str = '<div class="grid-item is-loading real-square" ' +
	    'data-square-idx="' + this.square_idx + '">' +
	    '<img class="img-responsive" src="' + thumbnail_url(this) + '" alt="pattern" />' +
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
	var num_fillers = 5 * Math.ceil((REAL_SQUARES.length + 5) / 5);
	var filler_squares = build_filler_squares(num_fillers);

	// Build quilt with all squares
	build_quilt(REAL_SQUARES.concat(filler_squares));

	// Initialize masonry library
	init_masonry();

	// Done!
    }

    function handle_failure(jqXHR, textStatus, errorThrown) {

	$('#quilt-progress').hide();

	$('#quilt-main').html('<h4>Ruh roh, server error, contact Montgomery</h4>');

    }
    
    /* -------------------- "Main" -------------------- */

    $.get('/squares')
    .done( setup_quilt )
    .fail( handle_failure );

}

