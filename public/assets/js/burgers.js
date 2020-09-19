// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
	// Mark the burger as devoured when Devour button is clicked
	$('.change-devoured').on('click', function(event) {
		const id = $(this).data('id');
		const newDevoured = !$(this).data('devoured');

		let newDevouredState = {
			devoured: newDevoured
		};

		// Send the PUT request to set Devoured to true in db
		$.ajax('/api/burgers/' + id, {
			type: 'PUT',
			data: newDevouredState
		}).then(function() {
			console.log('changed devoured to', newDevoured);
			// Reload the page to get the updated list
			location.reload();
		});
	});

	// Add a new burger from the form
	$('.create-form').on('submit', function(event) {
		event.preventDefault();
		const burgerInput = $('#burger').val().trim();
		// check to make sure the burger input isn't blank before adding the burger to the db
		if (burgerInput) {
			const newBurger = {
				burger_name: burgerInput,
				devoured: 0
			};

			// Send the POST request to add the new burger to the db
			$.ajax('/api/burgers', {
				type: 'POST',
				data: newBurger
			}).then(function() {
				console.log('created new burger');
				// Reload the page to get the updated list
				location.reload();
			});
		}
	});

	// Delete the burger when the trash button is clicked
	$('.delete-burger').on('click', function(event) {
		var id = $(this).data('id');

		// Send the DELETE request to remove the burger from the db
		$.ajax('/api/burgers/' + id, {
			type: 'DELETE'
		}).then(function() {
			console.log('deleted burger', id);
			// Reload the page to get the updated list
			location.reload();
		});
	});
});
