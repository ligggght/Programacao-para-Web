function codigoModificado() {
  let i = 0;
  let max = 10;

  async function p() {
    while (i < max) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(i++);
    }
  }

  p();
}

function executarEx9() {
  codigoModificado();
}
