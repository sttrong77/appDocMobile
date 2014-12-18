$(document).bind("mobileinit", function(){
	$.mobile.ajaxEnabled  = false; //desabilita ajaxEnabled
});
$( document ).on( "pageinit", function() {
    $( '.popupParent' ).on({
        popupafterclose: function() {
            setTimeout( function(){ $( '.popupChild' ).popup( 'open' ) }, 100 );
        }
    });
});