var GUI = function( $, _class ){
	var CLASS = _class +'View';
	var self = {
		
		fullscreen: function() {
			var el = document.documentElement,
				rfs = el.requestFullscreen
				|| el.webkitRequestFullScreen
				|| el.mozRequestFullScreen
				|| el.msRequestFullscreen 
			;
			
			rfs.call(el);
		},
		
		showView: function( view ) {
			//console.log('showView: '+ view);
			$('.'+ CLASS).fadeOut(200, function(){
				$('.'+ CLASS +'#view'+ view).fadeIn(200);
			});
		},
		
		setSmiley: function( smiley ) {
			$('#smiley').attr('src', 'img/'+ smiley +'.png');
		},

		setHours: function( hours ) {
            if( hours == 1 ) {
                $('#hourscontainer').fadeIn();
            }
            $('.count#hours').html( hours );
		},

		setMinutes: function( minutes, hours ) {
			$('.count#minutes').html( minutes )
		},

		sayThanks: function() {
            //$('#showUp').effect('shake', shakeConfig)
            self.showView('Thanks');
            setTimeout(
                self.showView,
                2000,
                ['Counter']
            );
        }
	};
	
	return self;
};