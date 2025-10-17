function haOnzeDigitos(cpf) {
    return cpf.length == 11
}

function todosOsOnzeDigitosSaoNumeros(cpf) {
    return /^\d{11}$/.test(cpf);
}

function osOnzeNumerosSaoDiferentes(cpf) {
    let splitted = cpf.split('');
    for (let i = 1; i < splitted.length; i++) {
        if (splitted[i] != splitted[0]) {
            return true
        }
    }
    return false
}

function verificadorDeDigitoVerificador(cpf, posicaoDoDigitoVerificador) {
    let splitted = cpf.split('');
    let digitoVer = splitted[posicaoDoDigitoVerificador];
    let soma = 0;
    for (let i = 0; i < posicaoDoDigitoVerificador; i++) {
        soma += splitted[i] * (posicaoDoDigitoVerificador+1 - i)
    }
    let somaMult = soma * 10
    let resto = somaMult % 11
    if (resto == 10) {
        resto = 0
    }
    if (resto == digitoVer) {
        return true
    }
    return false
}

function oPrimeiroDigitoVerificadorEhValido(cpf) {
    return verificadorDeDigitoVerificador(cpf, 9);
}

function oSegundoDigitoVerificadorEhValido(cpf) {
    return verificadorDeDigitoVerificador(cpf, 10);
}





//------------------- Não edite abaixo ----------------------------
function validarCPF(validacao, cpf) {
    switch (validacao) {
        case "onzeDigitos": return haOnzeDigitos(cpf)
        case "onzeSaoNumeros": return todosOsOnzeDigitosSaoNumeros(cpf) && validarCPF("onzeDigitos", cpf)
        case "naoSaoTodosIguais": return osOnzeNumerosSaoDiferentes(cpf) && validarCPF("onzeSaoNumeros", cpf)
        case "verificador10": return oPrimeiroDigitoVerificadorEhValido(cpf) && validarCPF("naoSaoTodosIguais", cpf)
        case "verificador11": return oSegundoDigitoVerificadorEhValido(cpf) && validarCPF("verificador10", cpf)

        default:
            console.error(validacao+" é um botão desconhecido...")
            return false
    }
}


function tratadorDeCliqueExercicio9(nomeDoBotao) {
    const cpf = document.getElementById("textCPF").value

    const validacao = (nomeDoBotao === "validade") ? "verificador11": nomeDoBotao
    const valido = validarCPF(validacao, cpf)
    const validoString = valido ? "valido": "inválido"
    const validadeMensagem = "O CPF informado ("+cpf+") é "+ validoString
    console.log(validadeMensagem)

    if (nomeDoBotao !== "validade") {
        let divResultado = document.getElementById(validacao);
        divResultado.textContent = validoString
        divResultado.setAttribute("class", valido ? "divValidadeValido": "divValidadeInvalido")    
    } else {
        window.alert(validadeMensagem)
    }

    
}