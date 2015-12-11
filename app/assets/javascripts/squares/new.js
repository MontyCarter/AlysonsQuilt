

function squares_new() {

    // Show file attached on change
    $('#square_media').change(function() {

	$('#square_media_status').html($('#square_media').val());

    });

}
