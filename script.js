// Get all service items
const serviceItems = Array.from(document.querySelectorAll('.serviceItem'));

// Add event listener to each service item
serviceItems.forEach((item) => {
	item.addEventListener('mouseenter', () => {
		// Remove active class from all service items
		serviceItems.forEach((activeItem) => {
			activeItem.classList.remove('active');
		});

		// Add active class to current service item
		item.classList.add('active');
	});
});

// Focus trapper function
function focusTrap(element) {
	const firstFocusableElement = element.querySelector(':focusable:first-child');
	const lastFocusableElement = element.querySelector(':focusable:last-child');

	const keydownHandler = ({ key }) => {
		switch (key) {
		case 'Tab':
			if (!event.shiftKey && document.activeElement === lastFocusableElement) {
				firstFocusableElement.focus();
				return false;
			} else if (event.shiftKey && document.activeElement === firstFocusableElement) {
				lastFocusableElement.focus();
				return false;
			}
			break;
		default:
			break;
		}
	};

	element.addEventListener('keydown', keydownHandler);

	return {
		dispose() {
			element.removeEventListener('keydown', keydownHandler);
		},
	};
}

// Toggle dark mode button functionality
const toggleButton = document.getElementById('toggleDarkMode');

toggleButton.addEventListener('click', () => {
	document.body.classList.toggle('dark');
});

// Initialize focus traps when page loads
window.onload = () => {
	const modalElements = Array.from(document.querySelectorAll('.modal'));
      modalElements.forEach((modal) => {
            focusTrap(modal);
      });
}
