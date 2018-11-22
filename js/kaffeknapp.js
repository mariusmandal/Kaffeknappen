var shakeConfig = {
	direction: 'up',
	times: 1,
	duration: 200,
}

/**
 * KEYSTROKE HOOKS
**/
$(document).on('keyup', function( e ) {
	// Arrow up
	if( e.keyCode == 38 ) {
		Kaffeknapp.reset();
	}
	// f
	else if ( e.keyCode == 70 ) {
		KaffeknappGUI.fullscreen();
	}
});

/**
 * GUI HOOKS
**/
$(document).ready(function(){
	/**
	 * APP -> GUI HOOKS
	**/
	KaffeknappGUI = new GUI( jQuery, 'Kaffeknapp');
	
	Kaffeknapp.on('start', 
		() => {
			KaffeknappGUI.showView('Ready')
		}
	);
	Kaffeknapp.on('stop',
		() => {
			KaffeknappGUI.showView('Ready');
		}
	);
	Kaffeknapp.on('tick:minute', 
		( minutes, hours ) => {
			KaffeknappGUI.setMinutes( minutes );
		}
	);
	Kaffeknapp.on('tick:hour', 
		( hours ) => {
			KaffeknappGUI.setHours( hours );
		}
	);
	Kaffeknapp.on('smiley', 
		( smiley ) => { 
			KaffeknappGUI.setSmiley( smiley ); 
		}
	);

	Kaffeknapp.on('reset', 
		(newCount) => { 
			KaffeknappGUI.sayThanks();
		}
	);

	/**
	 * START APP
	 */
	Kaffeknapp.start();
});