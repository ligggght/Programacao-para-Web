function calculadora(a, b, callback) {
  return callback(a, b)
}

function soma(a, b) {
  return a + b
}

function subtrai(a, b) {
  return a - b
}

function executarEx1() {
  console.log(calculadora(31, 12, soma))
  console.log(calculadora(11, 25, subtrai))
}
