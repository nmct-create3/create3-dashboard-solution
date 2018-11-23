function handleDropdownButton() {
	var show = 'is-open';
	var elements = document.getElementsByClassName('js-dropdown-toggle');

	//Hide/Show Dropdown Menu on Click
	for (var i = 0; i < elements.length; i++) {
		elements[i].addEventListener("click", function() {
			removeClass(elements,show);
			if(hasClass(this,show)) {
				removeClass(this,show);
			} else {
				addClass(this,show);
			}
		});
	}

	//Hide Dropdown when clicked outside of the Menu
	document.addEventListener('click', function (event) {
		for (var i = 0; i < elements.length; i++) {
			if (event.target.closest('.js-dropdown-toggle')) return;
			removeClass(elements[i],show);
		}
	}, false);

	function addClass(elements, myClass) {
		if (!elements) { return; }
		if (typeof(elements) === 'string') {
			elements = document.querySelectorAll(elements);
		}
		else if (elements.tagName) { elements=[elements]; }
		for (var i=0; i<elements.length; i++) {
			if ( (' '+elements[i].className+' ').indexOf(' '+myClass+' ') < 0 ) {
				elements[i].className += ' ' + myClass;
			}
		}
	}
	function removeClass(elements, myClass) {
		if (!elements) { return; }
		if (typeof(elements) === 'string') {
			elements = document.querySelectorAll(elements);
		}
		else if (elements.tagName) { elements=[elements]; }
		var reg = new RegExp('(^| )'+myClass+'($| )','g');
		for (var i=0; i<elements.length; i++) {
			elements[i].className = elements[i].className.replace(reg,' ');
		}
	}

	function hasClass(element, myClass) {
		return (' ' + element.className + ' ').indexOf(' ' + myClass + ' ') > -1;
	}
}

document.addEventListener( 'DOMContentLoaded', function() {
	console.log( 'Script loaded!' );
	handleDropdownButton();
});
