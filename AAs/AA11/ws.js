// Depuração
const debugInfo = document.getElementById("debugInfo");
const debugToggle = document.getElementById("debugToggle");
let debugMode = false;

// Elementos da UI
const serverDot = document.getElementById("serverDot");
const serverText = document.getElementById("serverText");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const clearBtn = document.getElementById("clearMessages");
const messageList = document.getElementById("messageList");
const tcpCount = document.getElementById("tcpCount");
const udpCount = document.getElementById("udpCount");
const totalCount = document.getElementById("totalCount");
const tabs = document.querySelectorAll(".tab");

// Contadores
let messagesStats = {
  tcp: 0,
  udp: 0,
  total: 0,
};

// WebSocket
let socket = null;

// Filtro atual
let currentFilter = "all";

// URL para o gerenciador do servidor
const managerUrl = "server_manager.py";

// Define o websocket (ws)
const websocketUrl = `ws://${window.location.hostname}:8082`; // URL para o WebSocket

// Estado do servidor
let serverStatus = "unknown";

debugToggle.addEventListener("click", () => {
  debugMode = !debugMode;
  debugInfo.style.display = debugMode ? "block" : "none";
  debugToggle.textContent = debugMode
    ? "Ocultar Informações de Depuração"
    : "Exibir Informações de Depuração";
});

function logDebug(message) {
  const now = new Date().toISOString();
  debugInfo.innerHTML += `[${now}] ${message}\n`;
  debugInfo.scrollTop = debugInfo.scrollHeight;
  console.log(`[DEBUG] ${message}`);
}

// Função para atualizar o status do servidor na UI
function updateServerStatus(status) {
  serverStatus = status;
  logDebug(`Atualizando status do servidor para: ${status}`);

  if (status === "running") {
    serverDot.className = "status-dot status-online";
    serverText.textContent = "Servidor: Online";
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } else if (status === "stopped") {
    serverDot.className = "status-dot status-offline";
    serverText.textContent = "Servidor: Offline";
    startBtn.disabled = false;
    stopBtn.disabled = true;
    if (socket) {
      socket.close();
      socket = null;
    }
  } else if (status === "starting") {
    serverDot.className = "status-dot status-offline";
    serverText.textContent = "Iniciando servidor...";
    startBtn.disabled = true;
    stopBtn.disabled = true;
  } else if (status === "stopping") {
    serverDot.className = "status-dot status-offline";
    serverText.textContent = "Parando servidor...";
    startBtn.disabled = true;
    stopBtn.disabled = true;
  } else {
    serverDot.className = "status-dot status-offline";
    serverText.textContent = "Servidor: Desconhecido";
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
}

// Verificar status do servidor
async function checkServerStatus() {
  logDebug("Verificando status do servidor...");
  try {
    const response = await fetch(managerUrl + "?action=status");

    const data = await response.json();
    logDebug(`Resposta bruta: ${JSON.stringify(data)}`);

    logDebug(`Status do servidor recebido: ${data.status}`);
    updateServerStatus(data.status);

    if (data.status === "running" && !socket) {
      connectWebSocket();
    }
  } catch (error) {
    logDebug(`Erro ao verificar status do servidor: ${error}`);
    updateServerStatus("unknown");
  }
}

// Iniciar o servidor
async function startServer() {
  logDebug("Iniciando servidor...");
  updateServerStatus("starting");
  try {
    const response = await fetch(managerUrl + "?action=start");
    const data = await response.json();
    logDebug(`Resposta do início:: ${JSON.stringify(data)}`);

    if (data.success) {
      updateServerStatus("running");
      connectWebSocket();
    } else {
      logDebug(`Erro ao iniciar: ${data.message}`);
      updateServerStatus("stopped");
    }
  } catch (error) {
    logDebug(`Erro ao iniciar servidor: ${error.message}`);
    updateServerStatus("unknown");
  }
}

// Parar o servidor
async function stopServer() {
  try {
    const response = await fetch(managerUrl + "?action=stop");
    const data = await response.json();
    logDebug(`Resposta da parada:: ${JSON.stringify(data)}`);

    if (data.success) {
      updateServerStatus("stopped");
      if (socket) {
        socket.close();
        socket = null;
      }
    } else {
      logDebug(`Erro ao parar: ${data.message}`);
      updateServerStatus("running");
    }
  } catch (error) {
    logDebug(`Erro ao parar servidor: ${error.message}`);
    checkServerStatus();
  }
}

// Conectar ao WebSocket
function connectWebSocket() {
  if (socket) {
    socket.close();
  }

  logDebug(`Conectando ao WebSocket em ${websocketUrl}...`);
  socket = new WebSocket(websocketUrl);

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      addMessage(message);
    } catch (error) {
      logDebug(`Erro ao processar mensagem do WebSocket: ${error.message}`);
    }
  };

  socket.onclose = () => {
    logDebug("WebSocket desconectado");
  };

  socket.onerror = (error) => {
    logDebug(`Erro no WebSocket: ${error.message}`);
  };
}

// Adiciona uma mensagem à lista
function addMessage(message) {
  // Incrementa os contadores
  const protocol = message.protocol.toLowerCase();
  messagesStats[protocol]++;
  messagesStats.total++;

  // Atualiza os contadores na UI
  tcpCount.textContent = messagesStats.tcp;
  udpCount.textContent = messagesStats.udp;
  totalCount.textContent = messagesStats.total;

  // Cria o item da mensagem
  const messageEl = document.createElement("div");
  messageEl.className = `message ${protocol}`;

  if (currentFilter !== "all" && currentFilter !== protocol) {
    messageEl.style.display = "none";
  }

  // Formata data e hora
  const date = new Date(message.timestamp);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  // Define o conteúdo da mensagem
  messageEl.innerHTML = `
        <div class="message-header">
            <span>
                <span class="protocol-badge ${protocol}-badge">${protocol.toUpperCase()}</span>
                <span>${message.ip}</span>
            </span>
            <span>${formattedDate} ${formattedTime}</span>
        </div>
        <div class="message-content">${message.content}</div>
    `;

  // Remove o elemento "Nenhuma mensagem" se existir uma pelo menos uma mensagem
  const noMessagesEl = messageList.querySelector(".no-messages");
  if (noMessagesEl) {
    messagesList.removeChild(noMessagesEl);
  }

  // Adiciona a mensagem à lista
  messageList.appendChild(messageEl);
  messageList.scrollTop = messageList.scrollHeight;
}

function clearMessages() {
  messageList.innerHTML =
    '<div class="no-messages">Nenhuma mensagem recebida.</div>';
  messagesStats = { tcp: 0, udp: 0, total: 0 };
  tcpCount.textContent = "0";
  udpCount.textContent = "0";
  totalCount.textContent = "0";
}

// Filtra as mensagens exibidas com base no protocolo
function filterMessages(filter) {
  currentFilter = filter;
  const messages = messageList.querySelectorAll(".message");

  messages.forEach((msg) => {
    if (filter === "all" || msg.classList.contains(filter)) {
      msg.style.display = "block";
    } else {
      msg.style.display = "none";
    }
  });
}

// Event listeners
startBtn.addEventListener("click", startServer);
stopBtn.addEventListener("click", stopServer);
clearBtn.addEventListener("click", clearMessages);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    filterMessages(tab.dataset.filter);
  });
});

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  logDebug("Aplicação carregada. Verificando status do servidor...");
  setInterval(checkServerStatus, 5000); // Verifica o status do servidor a cada 5 segundos
});
