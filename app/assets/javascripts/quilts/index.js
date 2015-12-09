
function quilts_index() {

    $('document').ready(function() {

	$('.grid').imagesLoaded().done( function(instance) {

	    $('.grid').masonry({

		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		percentPosition: true

	    })

	    $(window).resize(function() {

		$('.grid').masonry();

	    });

	})

    });

}

