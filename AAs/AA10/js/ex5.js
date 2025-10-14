const olaTchau = () => {

    console.log("Olá")

    setTimeout(() => console.log("Tchau"), 2000)

}

const olaETchau = () => {
    setTimeout(() => console.log("Tchau"), 2000)
    console.log("Olá")
}

function executarEx5() {
  olaETchau()
  olaTchau()
}

// Os dois funcionam corretamente