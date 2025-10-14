function consoleAtrasado(mensagem, atraso) {
  setTimeout(() => console.log(mensagem), atraso);
}

function executarEx4() {
  console.log("Olá");
  consoleAtrasado("Teste", 10000);
  console.log("Bye");
}
