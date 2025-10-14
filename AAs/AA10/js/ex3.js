function codigoDadoE3() {
  function consoleAtrasado(mensagem, atraso) {
    setTimeout(console.log(mensagem), atraso);
  }

  console.log("Olá");

  consoleAtrasado("Teste", 10000);

  console.log("Bye");
}

function executarEx3() {
  console.clear();
  console.log(
    "Primeiro é printado o 'Olá', pois está na sequência do código. E há o que chamaríamos de um erro nesse código, o setTimeout espera uma função para callback, contudo, está sendo passado direto um console.log, quando na verdade, deveria ser uma arrow function por exemplo. Sabendo disso, o setTimeout não fica configurado da forma que parece, ele fica na verdade com 'undefined' como primeiro parâmetro, isto é, por conta de que o console.log retorna undefined. Logo, como o console.log RODA para configurar o setTimout, acabamos tendo o print dele como o segundo, então aparecendo 'Teste' diretamente no console. Por fim, o 'Bye' é printado, então a ordem correta dos prints é: Olá, Teste, Bye.\n"
  );

  setTimeout(codigoDadoE3, 1000);
}
