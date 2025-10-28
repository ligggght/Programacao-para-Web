let is_CEP_Valid = false;

async function tratarCEP() {
  let cep = document.getElementById("cepRegistro").value;
  const status = document.getElementById("statusCEP");

  // Remove caracteres não numéricos
  cep = cep.replace(/\D/g, "");

  // Verifica se o CEP possui 8 dígitos
  if (cep.length !== 8) {
    status.textContent = "CEP deve conter 8 dígitos.";
    is_CEP_Valid = false;
    return is_CEP_Valid;
  }

  await fetchAndFillAddress(cep);
  return is_CEP_Valid;
}

function IsCEPValid() {
  return is_CEP_Valid;
}

async function fetchAndFillAddress(cep) {
  const status = document.getElementById("statusCEP");
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      status.textContent = "CEP não encontrado.";
      is_CEP_Valid = false;
      return;
    }

    document.getElementById("logradouroRegistro").value = data.logradouro || "";
    document.getElementById("bairroRegistro").value = data.bairro || "";
    document.getElementById("cidadeRegistro").value = data.localidade || "";
    document.getElementById("estadoRegistro").value = data.uf || "";
    status.textContent = "";

    is_CEP_Valid = true;
    checarTodosCampos();
  } catch (error) {
    status.textContent = "Erro ao buscar o CEP.";
    console.error("Erro ao buscar o CEP:", error);
    is_CEP_Valid = false;
  }
}
