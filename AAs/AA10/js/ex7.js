function codigoDadoE7() {
  const resolverEm1s = new Promise((resolve) => setTimeout(resolve, 1000));

  for (let i = 0; i < 10; i++) {
    resolverEm1s.then(() => console.log(i));
  }
}

function executarEx7() {
  console.clear();

  console.log(
    "Semelhante ao exercício 6, mas agora deve imprimir os números de 0 a 9 no mesmo funcionamento do exercício 6. A promisse é gerada, então passa para a proxima linha, onde o loop executa 10 vezes, setando 10 callbacks para quando a promisse for resolvida. Printando os números de 0 a 9 depois de 1 segundo da chamada pelo setTimeout. Vale notar que como estudamos na primeira parte da disciplina, caso a variável fosse definida com VAR, não seriam impressos números de 0 a 9 e sim apenas números 10, por conta do hoisting.\n"
  );
  setTimeout(codigoDadoE7, 1000);
}
