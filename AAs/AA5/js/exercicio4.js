function isInInterval() {
  const num = Number(window.prompt("Digite um número: "));

  if (30 <= num && num <= 50) {
    console.log("O número " + num + " está no intervalo de 30 a 50.");
  } else if (60 <= num && num <= 100) {
    console.log("O número " + num + " está no intervalo de 60 a 100.");
  } else {
    console.log("O número " + num + " não está em nenhum dos intervalos.");
  }
}

function tratadorDeCliqueExercicio4() {
  isInInterval();
  isInInterval();
}