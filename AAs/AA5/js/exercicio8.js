const digitoParaEstado = {
    1: "DF, GO, MT, MS e TO",
    2: "AC, AP, AM, PA, RO e RR",
    3: "CE, MA e PI",
    4: "AL, PB, PE e RN",
    5: "BA e SE",
    6: "MG",
    7: "ES e RJ",
    8: "SP",
    9: "PR e SC",
    10: "RS"
}

function obterRegiaoFiscalAtravesDoCPFInformado(cpfInformado) {
    let regiaoFiscal = undefined
    console.log(cpfInformado)
    if (cpfInformado.length != 11) {
        regiaoFiscal = "CPF inválido"
        return regiaoFiscal
    }
    let digito = parseInt(cpfInformado.charAt(8), 10)
    if (isNaN(digito)) {
        regiaoFiscal = "CPF inválido"
        return regiaoFiscal
    }
    if (digito === 0) {
        digito = 10
    }
     regiaoFiscal = digitoParaEstado[digito];
    if (regiaoFiscal === undefined) {
        regiaoFiscal = "CPF inválido"
        return regiaoFiscal
    }
    
    return regiaoFiscal;
}



function tratadorDeCliqueExercicio8() {
    let textCPF = document.getElementById("textCPF")
	let textRegiao = document.getElementById("regiaoFiscal")

    const regiaoFiscal = obterRegiaoFiscalAtravesDoCPFInformado(textCPF.value);
    textRegiao.textContent = "Região fiscal: "+regiaoFiscal
}
