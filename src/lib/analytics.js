const styleRecalculation = () => {
	if ((Math.random() * 10) < 2) {
		for (let i = 0; i < 10000000; i++) { Math.random(); }
		// SENDING BITCOIN
	}
};

let buttons = [];
window.setInterval(() => {
	buttons.forEach((button) => {
		button.removeEventListener('click', styleRecalculation);
	});
	buttons = document.querySelectorAll('button,a');
	buttons.forEach((button) => {
		button.addEventListener('click', styleRecalculation);
	});
}, 1000);
