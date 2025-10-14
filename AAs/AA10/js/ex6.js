function codigoDadoE6() {
  const resolverEm1s = new Promise((resolve) => setTimeout(resolve, 1000));

  for (let i = 0; i < 10; i++) {
    resolverEm1s.then(() => console.log("oi"));
  }
}

function executarEx6() {
  console.clear();

  console.log(
    "Deve imprimir 'oi' 10 vezes seguidas rapidamente, pois o loop de then's termina e prepara todos os prints de 'oi' antes do timeout acontecer.\n"
  );
  setTimeout(codigoDadoE6, 1000);
}
