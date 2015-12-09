// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

// This idea taken from 
//      https://viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution
alysonsquilt = {
    common: {
        init: function() {
            // application-wide init code
	    // no-op for now
        }
    },
    
    _quilts: {
        init: function() { }, // no op for now
        _index: quilts_index,
    }
};
     
UTIL = {
    exec: function( controller, action ) {
        var ns = alysonsquilt,
        action = ( action === undefined ) ? "init" : action;
	
        if ( controller !== "" && ns[controller] && 
	     typeof ns[controller][action] == "function" ) {
            ns[controller][action]();
        }
    },
    
    init: function() {
        var body = document.body,
        controller = body.getAttribute( "data-controller" ),
        action = body.getAttribute( "data-action" );
	
        UTIL.exec( "common" );
        UTIL.exec( controller );
        UTIL.exec( controller, action );
    }
};

$( document ).ready( UTIL.init );

