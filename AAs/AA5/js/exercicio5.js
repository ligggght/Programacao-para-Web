function convertCelciusToFahrenheit(celcius) {
	// Fórmula: (C * 9/5) + 32 = F
	if (isNaN(celcius)) {
	return "Por favor, insira um número válido.";
	}
	let fahrenheit = (celcius * 9/5) + 32;
	return fahrenheit.toFixed(2);
}





// -- Não edite abaixo!

function conversaoCtoF() {
	let textCelcius = document.getElementById("celciusText")
	let textFahrenheit = document.getElementById("resultFahrenheit")
	textFahrenheit.textContent = convertCelciusToFahrenheit(textCelcius.value) + 
								 "ºF"
}