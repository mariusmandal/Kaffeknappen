var SecondCounter = function( id, _EMITTER ) {
	var seconds = 0;
	var interval = 0;
	var emit = new _EMITTER( 'SecondCounter('+id+')' );

	var self = {
		start: function() {
			self.tick();
			interval = setInterval(
				self.tick,
				10
			);
		},

		stop: function() {
			clearInterval( interval );
		},

		reset: function() {
			self.stop();
			seconds = 0;
		},

		tick: function() {
			seconds++;
			self.emit('tick:second');
			if( seconds%60 == 0 ) {
				self.emit('tick:minute');
			}
			if( seconds%3600 == 0 ) {
				self.emit('tick:hour');
			}
		},

		getHours: function() {
			return Math.floor( seconds / 3600 );
		},
		
		getMinutes: function() {
			return Math.ceil(  (seconds%3600) / 60 );
		},

		/* EMIT FORWARDER */
		on: function( _event, _callback ) {
			emit.on( _event, _callback );
		},
		emit: function( _event, _data ) {
			return emit.emit( _event, _data );
		}
	}

	return self;
}