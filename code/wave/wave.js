$(document).ready(function() {
	try {
		$('body').ripples({
			resolution: 512,
			dropRadius: 20, //px
			perturbance: 0.04,
		});
		$('main').ripples({
			resolution: 128,
			dropRadius: 10, //px
			perturbance: 0.04,
			interactive: false
		});
	}
	catch (e) {
		$('.error').show().text(e);
	}

});