var Kaffeknapp = function( $, _EMITTER ) {
	var timer = null;
	var emit = new _EMITTER('Kaffeknapp');
	var current_smiley = null;

	var self = {

		start: function() {
			self.emit('start');
            timer = new SecondCounter( 'Kaffeknapp', _EMITTER );
			timer.on('tick:minute', self.tickMinutes);
			timer.on('tick:hour', self.tickHours);
			self.showCorrectSmiley();
		},
		
		stop: function() {
			timer.stop();
			self.emit('stop');
        },
        
        reset: function() {
            timer.stop();
            timer.reset();
            timer.start();
            self.emit('reset');
        },

		tickMinutes: function() {
			self.emit('tick:minute', [timer.getMinutes(), timer.getHours()] );
			self.showCorrectSmiley();
			//console.info('Minute passed! Now at ' + timer.getHours() + ':' + timer.getMinutes() );
		},

		tickHours: function() {
			var hours = timer.getHours();
			if( hours > 59 ) {
				self.stop();
			}
			self.emit('tick:hour', [ hours ] );
			self.showCorrectSmiley();
			//console.info('Hour passed! Now at '+ timer.getHours() + ':' + timer.getMinutes() );
		},

		showCorrectSmiley: function() {
			var smiley = 'freezing';
			var hours = timer.getHours();

			if( hours == 0 ) {
				if( timer.getMinutes() < 30 ) {
					smiley = 'sunglasses';
				} else {
					smiley = 'grinning';
				}
			} else if( hours == 1 ) {
				smiley = 'smiling'; 
			} else if( hours == 2 ) {
                if( timer.getMinutes() < 24 ) {
                    smiley = 'smiling';
                } else {
                    smiley = 'thinking';
                }
            } else if( hours == 3 ) {
                if( timer.getMinutes() < 30 ) {
                    smiley = 'grimacing';
                } else {
                    smiley = 'freezing';
                }
			} else if( hours > 24 ) {
                smiley = 'sick';
            }

			if( smiley != current_smiley ) {
				self.emit('smiley', [smiley]);
				current_smiley = smiley;
			}
		},

		getSmiley: function() {
			return current_smiley;
		},

		/* EMIT FORWARDER */
		on: function( _event, _callback ) {
			emit.on( _event, _callback );
		},
		emit: function( _event, _data ) {
			return emit.emit( _event, _data );
		}
	};
	
	return self;
}( jQuery, Emitter );