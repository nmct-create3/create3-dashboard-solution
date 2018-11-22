function handleDropdownButton() {
	let dropdownButton = document.querySelector( '.js-dropdown-toggle' );

	dropdownButton.addEventListener( 'click', function( e ) {
		e.preventDefault();
		dropdownButton.classList.toggle( 'is-open' );
	});
}

document.addEventListener( 'DOMContentLoaded', function() {
	console.log( 'Script loaded!' );
	handleDropdownButton();
	// handleButtonClick();
});
