//
// Used to render main quilt page (see quilt/index.html.rb)
//

$('document').ready(function() {

    $('.grid').imagesLoaded().done( function(instance) {

	$('.grid').masonry({

	    itemSelector: '.grid-item',
	    columnWidth: '.grid-sizer',
	    percentPosition: true

	})

    })

});
