// Seleção de conteúdo a ser exibido
function mostrarApenasHome() {
  document.getElementById("divHome").style.display = "block";
  document.getElementById("login-body").style.display = "none";
  document.getElementById("nova-conta").style.display = "none";
}

function mostrarApenasLogin() {
  document.getElementById("divHome").style.display = "none";
  document.getElementById("login-body").style.display = "block";
  document.getElementById("nova-conta").style.display = "none";
  resetarLogin();
}

function mostrarApenasConta() {
  document.getElementById("divHome").style.display = "none";
  document.getElementById("login-body").style.display = "none";
  document.getElementById("nova-conta").style.display = "block";
  resetarFormulario();
}

// ------------------------------------------------------------------------------

// Tratamento do formulário de login

function validarLogin() {
  let email = document.getElementById("login-email").value;
  let senha = document.getElementById("login-password").value;
  let botaoLogin = document.getElementById("botaoLogin");
  let contadorArroba = 0;

  for (let i = 0; i < email.length; i++) {
    if (email[i] === "@") {
      contadorArroba++;
    }
  }
  if (contadorArroba === 1 && email.includes(".") && senha !== "") {
    botaoLogin.disabled = false;
  } else {
    botaoLogin.disabled = true;
  }
}

function resetarLogin() {
  console.log("resetarLogin");
  console.log(
    "manterConectado",
    document.getElementById("manterConectado").checked
  );
  document.getElementById("login-email").value = "";
  document.getElementById("login-password").value = "";
  document.getElementById("botaoLogin").disabled = true;

  let campoSenha = document.getElementById("login-password");
  let olho = document.getElementById("olho");
  campoSenha.type = "password";
  olho.src =
    "https://cdn0.iconfinder.com/data/icons/ui-icons-pack/100/ui-icon-pack-14-512.png";
}

// ------------------------------------------------------------------------------

// Tratamento do formulário de criação de conta

class Conta {
  constructor(nome, sobrenome, email, cpf, senha) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.email = email;
    this.cpf = cpf;
    this.senha = senha;
  }
}

function criarConta() {
  if (!checarTodosCampos()) {
    alert("Por favor, corrija os erros no formulário antes de continuar.");
    return;
  }
  let nome = document.getElementById("nomeRegistro").value;
  let sobrenome = document.getElementById("sobrenomeRegistro").value;
  let email = document.getElementById("emailRegistro").value;
  let cpf = document.getElementById("cpfRegistro").value;
  let senha = document.getElementById("senhaRegistro").value;

  let novaConta = new Conta(nome, sobrenome, email, new CPF(cpf), senha);
  console.log(novaConta);
}

function checarTodosCampos() {
  const nomeInput = document.getElementById("nomeRegistro");
  const sobrenomeInput = document.getElementById("sobrenomeRegistro");
  const emailInput = document.getElementById("emailRegistro");
  const cpfInput = document.getElementById("cpfRegistro");
  // senhas são validadas dentro da função validarSenha()
  // const senhaInput = document.getElementById("senhaRegistro");
  // const repetirSenhaInput = document.getElementById("repetirSenhaRegistro");

  // Executa todas as validações
  const nomeValido = validaTextoEmBranco(nomeInput, "statusNome", "Nome");
  const sobrenomeValido = validaTextoEmBranco(
    sobrenomeInput,
    "statusSobrenome",
    "Sobrenome"
  );
  const emailValido = validarEmail(emailInput);

  let cpfValido = false;
  try {
    new CPF(cpfInput.value); // tenta instanciar a classe CPF
    document.getElementById("statusCPF").textContent = "✓";
    document.getElementById("statusCPF").style.color = "green";
    cpfValido = true;
  } catch (e) {
    document.getElementById("statusCPF").textContent = e.message;
    document.getElementById("statusCPF").style.color = "red";
  }

  const senhaValida = validarSenha();

  // Se todos os campos forem válidos, habilita o botão
  const botao = document.getElementById("botaoCriarConta");
  if (
    nomeValido &&
    sobrenomeValido &&
    emailValido &&
    cpfValido &&
    senhaValida
  ) {
    botao.disabled = false;
    return true;
  } else {
    botao.disabled = true;
    return false;
  }
}

function validaTextoEmBranco(input, statusId, campoNome) {
  const status = document.getElementById(statusId);
  if (!input.value.trim()) {
    status.textContent = `${campoNome} não pode ficar vazio.`;
    status.style.color = "red";
    return false;
  }
  status.textContent = "✓";
  status.style.color = "green";
  return true;
}

function validarEmail(input) {
  const status = document.getElementById("statusEmail");
  const valor = input.value;
  if (
    !valor.includes("@") ||
    valor.split("@").length !== 2 ||
    !valor.includes(".")
  ) {
    status.textContent = "E-mail inválido!";
    status.style.color = "red";
    return false;
  }
  status.textContent = "✓";
  status.style.color = "green";
  return true;
}

function validarSenha() {
  console.log("validarSenha");
  const statusSenha = document.getElementById("statusSenha");
  const statusRepitaSenha = document.getElementById("statusRepitaSenha");
  const repetirSenhaInput = document.getElementById(
    "repetirSenhaRegistro"
  ).value;
  const senhaInput = document.getElementById("senhaRegistro").value;

  if (repetirSenhaInput.length === 0) {
    statusRepitaSenha.textContent = "";
  }

  // Niveis de seguranca (super simples)
  if (senhaInput.length < 8) {
    statusSenha.textContent = "Senha deve ter ao menos 8 caracteres.";
    statusSenha.style.color = "red";
    statusRepitaSenha.textContent = "";
    return false;
  }

  if (
    (!/[!@#$%^&*]/.test(senhaInput) && !/\d/.test(senhaInput)) ||
    /^\d+$/.test(senhaInput)
  ) {
    statusSenha.textContent = "Senha muito fraca.";
    statusSenha.style.color = "red";
    statusRepitaSenha.textContent = "";
    return false;
  }

  if (
    senhaInput.length >= 8 &&
    /[!@#$%^&*]/.test(senhaInput) &&
    /\d/.test(senhaInput) &&
    /[A-Z]/.test(senhaInput) &&
    /[a-z]/.test(senhaInput)
  ) {
    statusSenha.textContent = "Senha forte.";
    statusSenha.style.color = "green";
  } else {
    statusSenha.textContent = "Senha moderada.";
    statusSenha.style.color = "orange";
  }

  if (senhaInput !== repetirSenhaInput) {
    statusRepitaSenha.textContent = "Senhas não conferem.";
    statusRepitaSenha.style.color = "red";
    return false;
  }
  statusRepitaSenha.textContent = "✓";
  statusRepitaSenha.style.color = "green";
  return true;
}

function resetarFormulario() {
  [
    "nomeRegistro",
    "sobrenomeRegistro",
    "emailRegistro",
    "cpfRegistro",
    "senhaRegistro",
    "repetirSenhaRegistro",
  ].forEach((id) => (document.getElementById(id).value = ""));
  [
    "statusNome",
    "statusSobrenome",
    "statusEmail",
    "statusCPF",
    "statusSenha",
    "statusRepitaSenha",
  ].forEach((id) => {
    const el = document.getElementById(id);
    el.textContent = "";
  });
  document.getElementById("botaoCriarConta").disabled = true;
}

// ------------------------------------------------------------------------------

// Tratamento CPF

class CPF {
  constructor(cpf) {
    this.cpf = cpf;

    if (!this.haOnzeDigitos(cpf)) {
      throw new Error("CPF deve ter exatamente 11 dígitos.");
    }
    if (!this.todosOsOnzeDigitosSaoNumeros(cpf)) {
      throw new Error("CPF deve conter apenas números.");
    }
    if (!this.osOnzeNumerosNaoSaoIguais(cpf)) {
      throw new Error("CPF não pode ter todos os dígitos iguais.");
    }
    if (!this.oPrimeiroDigitoVerificadorEhValido(cpf)) {
      throw new Error("Primeiro dígito verificador inválido.");
    }
    if (!this.oSegundoDigitoVerificadorEhValido(cpf)) {
      throw new Error("Segundo dígito verificador inválido.");
    }
  }

  haOnzeDigitos(cpf) {
    return cpf.length == 11;
  }

  todosOsOnzeDigitosSaoNumeros(cpf) {
    return /^\d{11}$/.test(cpf);
  }

  osOnzeNumerosNaoSaoIguais(cpf) {
    let splitted = cpf.split("");
    for (let i = 1; i < splitted.length; i++) {
      if (splitted[i] != splitted[0]) {
        return true;
      }
    }
    return false;
  }

  verificadorDeDigitoVerificador(cpf, posicaoDoDigitoVerificador) {
    let splitted = cpf.split("");
    let digitoVer = splitted[posicaoDoDigitoVerificador];
    let soma = 0;
    for (let i = 0; i < posicaoDoDigitoVerificador; i++) {
      soma += splitted[i] * (posicaoDoDigitoVerificador + 1 - i);
    }
    let somaMult = soma * 10;
    let resto = somaMult % 11;
    if (resto == 10) {
      resto = 0;
    }
    if (resto == digitoVer) {
      return true;
    }
    return false;
  }

  oPrimeiroDigitoVerificadorEhValido(cpf) {
    return this.verificadorDeDigitoVerificador(cpf, 9);
  }

  oSegundoDigitoVerificadorEhValido(cpf) {
    return this.verificadorDeDigitoVerificador(cpf, 10);
  }
}

function validarCPF(input) {
  const cpf = input.value;
  const status = document.getElementById("statusCPF");

  try {
    const cpfObj = new CPF(cpf);
    status.textContent = "✓";
    status.style.color = "green";
    return true;
  } catch (e) {
    status.textContent = "✗ " + e.message;
    status.style.color = "red";
    return false;
  }
}
