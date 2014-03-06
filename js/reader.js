// thanks to http://stackoverflow.com/questions/6543917
String.prototype.countWords = function() {
	return this.split(/\s+\b/).length;
}
			
			
var timer = {
	startTime: 0,
				endTime: 0,
				started: false,
				start: function() {
					this.started = true;
					this.startTime = new Date().getTime();
				},
				stop: function() {
		if (this.started) {
						this.started = false;
						this.endTime = new Date().getTime();
					}
				},
				length: function () {
					if (!this.started) {
						return (this.endTime - this.startTime) / 1000;
					} else {
						return 0;
					}
				},
				formattedLength: function() {
		var l = this.length();
					var ret = '';
					if (l > 60) {
			var m = Math.floor (l/60.0);
						var s = Math.floor(l%60);//remainder
			ret = m + ' minute(s) and ' + s + ' seconds ';
					} else {
					   ret = l + ' seconds';
					}
					return ret;
				},
				showLength: function() {
					alert(this.length() + " secs");
				},
				wpm: function(words_count) {
		var ret = 0;
					var l = this.length();
					if (l != 0.0) {
			return words_count / l * 60.0;
					}
					return ret;
				},
			};
			var startbutton, stopbutton;
			
			function startup() {			
				startbutton.removeAttr("disabled");
				startbutton.removeClass('form-button-disabled');
				stopbutton.attr('disabled', 'true');			
				stopbutton.addClass('form-button-disabled');
				
				startbutton.click (start_handler);
				stopbutton.click(stop_handler);
			}
			
			function start_handler () {
				//alert('start handler');
				console.log('starting timer');
				jQuery('#user-output').html('');
				startbutton.attr('disabled', 'true');
				startbutton.addClass('form-button-disabled');
				stopbutton.removeAttr('disabled');
				stopbutton.removeClass('form-button-disabled');
				
				//also disable the drop down box
				jQuery('#edit-test-node').attr('disabled', true);
				timer.start();
				return false; // play nice with Drupal.
			}
			
			function stop_handler() {
				timer.stop();			
	console.log('stopped timer');
				stopbutton.attr('disabled', 'true');
				stopbutton.addClass('form-button-disabled');
				startbutton.removeAttr('disabled');
				startbutton.removeClass('form-button-disabled');
				jQuery('#edit-test-node').removeAttr('disabled');
				var word_count = jQuery('#reader-content').text().countWords();
				var wpm = Math.round(timer.wpm(word_count));
				//alert( 'wpm: ' + wpm);
				jQuery('#user-output').html (
		"Total Time: " + timer.formattedLength() + "<br />" +
					"Words: " + word_count + "<br />" +
		"Speed: " + wpm + " words/minute"
				);
				return false; // play nice with Drupal
			}
			
		
jQuery(document).ready(function($) {
	startbutton = $('#readingspeed-testpage #edit-test-start');
	stopbutton  = $('#readingspeed-testpage #edit-test-stop');
	startup();
});
