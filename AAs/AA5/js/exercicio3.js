function tratadorDeCliqueExercicio3() {
  let string = window.prompt("Insira uma string: ")
  while (true) {
    if (string.length > 2) {
      break
    } else {
      string = window.prompt("Insira uma string com mais de 2 caracteres: ")
    }
  }
  let stringSemComecoEFim = string.substring(1, string.length - 1)
  window.alert("A string sem os caracteres inicial e final é: " + stringSemComecoEFim)
}