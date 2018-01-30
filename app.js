$(function () {
	// Get the form.
	var form = $('#ajax-contact');
	// Get the messages div.
	var formMessages = $('#form-messages');
	// Set up an event listener for the contact form.
	$(form).submit(function (e) {
		// Stop the browser from submitting the form.
		e.preventDefault();
		// Serialize the form data.
		var formData = $(form).serialize();
		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function (response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('alert alert-danger');
			$(formMessages).addClass('alert alert-success');
			// Set the message text.
			$(formMessages).text(response);
			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#message').val('');
		})
		.fail(function (data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('alert alert-success');
			$(formMessages).addClass('alert alert-danger');
			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});
	});
});

function getValues () {
	const numCats = document.querySelector('#numCats').value;
	const numDays = document.querySelector('#numDays').value;
	const totalCost = document.querySelector('#totalCost');
	totalCost.innerText = '£' + (calcCost(numCats, numDays));
}

function calcCost (cats, days) {
	const baseDaily = 6;
	let endCost = 0;
	if (cats < 1) {
		return 0;
	} else if (cats !== 1) {
		let baseCats = 1 + (cats - 1) * 0.33;
		endCost = baseDaily * days * baseCats;
		return roundValue(endCost);
	} else {
		endCost = baseDaily * days;
		return roundValue(endCost);
	}
}

function roundValue (cost) {
	return Math.round(cost * 100) / 100;
}
