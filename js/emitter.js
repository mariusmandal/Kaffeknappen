var Emitter = function( _navn ) {
	var _events = [];
	
	var log = false;
	try {
		if( EMITTER_DEBUG == 1 ) {
			log = true;
		}
	} catch( err ) {
		console.warn('EMITTER_DEBUG not defined');
	}

	var navn = (_navn !== undefined && _navn !== null) ? _navn.toUpperCase() : 'UKJENT';
	
	var self = {
		/* EVENT HANDLERS */
		emit: function( event, data ) {
		

			if( log ) {
				console.info( navn + '::emit('+event+')', data);
			}

			if( _events[event] != null ) {
				_events[event].forEach( function( _event ) {
					_event.apply(null, data );
				});
			}
			return self;
		},
		
		on: function( event, callback ) {
			if( _events[event] == null ) {
				_events[ event ] = [callback];
				return;
			}
			_events[ event ].push( callback );
			return self;
		}
	};
	
	return self;
}