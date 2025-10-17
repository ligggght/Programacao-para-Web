function codigoDadoE8() {
  let i = 0;
  let max = 10;
  function p() {
    pp = new Promise((resolve) => setTimeout(resolve, 1000));
    pp.then(() => {
      console.log(i++);
      if (i < max) {
        return p();
      }
    });
    return pp;
  }
  p();
}

function executarEx8() {
  console.clear();

  console.log(
    "Semelhante ao exercício 7, mas agora os números são impressos um a um, com um intervalo de 1 segundo entre cada impressão. Isso acontece pois há uma 'possível' recursão, que é verificada e chamada toda vez que a promisse é resolvida (criando uma nova promisse), até que o valor de i seja maior ou igual ao máximo definido. Até lá, os valores de 0 até max-1 (9 no caso) aparecem na console em intervalos de 1 segundo cada.\n"
  );
  setTimeout(codigoDadoE8, 1000);
}
