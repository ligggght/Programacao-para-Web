function codigoModificadoE4() {
  function consoleAtrasado(mensagem, atraso) {
    setTimeout(() => console.log(mensagem), atraso);
  }

  console.log("Olá");
  consoleAtrasado("Teste", 10000);
  console.log("Bye");
}

function executarEx4() {
  console.clear();

  setTimeout(codigoModificadoE4, 1000);
}
