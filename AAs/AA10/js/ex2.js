function codigoDadoE2() {
  var callback = function () {
    console.log("Estou na função de callback");
  };

  console.log("Iniciei");

  setTimeout(callback, 5000);

  console.log("Estou após o setTimeout");
}

function executarEx2() {
  console.clear();
  console.log("A função passada de callback está correta, então a ordem dos prints é: 'Iniciei', 'Estou após o setTimeout', e após 5 segundos, 'Estou na função de callback'.\n"
  );
  setTimeout(codigoDadoE2, 1000);
}
