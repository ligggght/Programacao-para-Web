function tratadorDeCliqueExercicio2() {
    // atualize esta função para
    // exibir um alerta com a hora 
    // atual no seguinte formato:
    // Horário: 8 PM : 40m : 28s
    let agora = new Date()

    let hora = agora.getHours()
    let minuto = agora.getMinutes()
    let segundo = agora.getSeconds()

    let sufixo = hora >= 12 ? "PM" : "AM"
    hora = hora % 12

    hora = hora ? hora : 12 // se hora for 0, atribui 12
    minuto = minuto < 10 ? "0" + minuto : minuto

    window.alert("Horário: " + hora + " " + sufixo + " : " + minuto + "m : " + segundo + "s")
}