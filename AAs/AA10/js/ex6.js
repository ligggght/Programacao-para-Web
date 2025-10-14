function codigoDado() {
  const resolverEm1s = new Promise((resolve) => setTimeout(resolve, 1000));

  for (let i = 0; i < 10; i++) {
    resolverEm1s.then(() => console.log("oi"));
  }
}

function executarEx6() {
  console.log(
    "Teóricamente deveria imprimmir 'oi' 10 vezes seguidas instantaneamente, pois o loop de then's termina e prepara todos os prints de 'oi' antes do timeout, inclusive é observado ao rodar no ambiente Node. Contudo, na prática, possíveis otimizações do browser fazem com que apenas um 'oi' seja impresso. Como pode observar:\n"
  );
  setTimeout(codigoDado, 1000);
}
