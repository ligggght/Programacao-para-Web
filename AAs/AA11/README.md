# Servidor Web com Suporte a TCP, UDP e WebSocket

Este projeto implementa um **servidor web** que integra:

- Servidor HTTP (Apache 2) para servir páginas HTML, CSS e JS.
- Servidor WebSocket para comunicação em tempo real com clientes web.
- Servidores TCP e UDP para receber mensagens de clientes tradicionais.

O front-end (HTML/JS) permite iniciar/parar o servidor e visualizar mensagens em tempo real.

---

## Estrutura do Projeto

AA11/
├── index.html # Página principal
├── js/
│ └── ws.js # Lógica do WebSocket e interface
├── css/
│ └── ws.css # Estilo da interface
└── py/
├── websocket_server.py # Servidor WS/TCP/UDP
├── server_manager.py # Gerenciador do servidor (start/stop/status)
├── tcp_client.py # Cliente TCP de teste
└── udp_client.py # Cliente UDP de teste

---

## Configuração do Apache e permissões

1. Habilitar execução de scripts CGI para a pasta de Python:

etc/apache2/sites-available/000-default.conf
Adicionar entre as tags VirtualHost

```
<Directory /var/www/html/AA/aa11/py>
    Options +ExecCGI +FollowSymlinks
    Require all granted
    SetHandler cgi-script
    DirectoryIndex index.html
</Directory>
```

Habilitar o módulo de cgi no servidor com:

```
a2enmod cgi
```

Em etc/apache2/mods-avaiable/mime.conf
Descomentar linha que habilita arquivos .cgi serem executados:

```
AddHandler cgi-script .cgi
```

Novamente em
etc/apache2/sites-available/000-default.conf
Para permitir que arquivos Python sejam tratados como cgi, adicionar a seguinte linha dentro das tags VirtualHost:

```
AddHandler cgi-script .py

```

Arquivos e pastas dentro do diretório do projeto receberam grupo www-data (apache) e dono o usuário marco.antonio.machado.arruda

```
chown marco.antonio.machado.arruda:www-data index.html
chown -R marco.antonio.machado.arruda:www-data css js py
```

Permissões de arquivos alteradas

```
chmod 755 index.html
chmod 755 css js
chmod 775 py
```

Configurar permissões para que o Apache consiga ler e escrever o arquivo de PID do servidor:

```
sudo chown marco.antonio.machado.arruda:www-data /var/www/html/AA/aa11/py/websocket_server.pid
sudo chmod 664 /var/www/html/AA/aa11/py/websocket_server.pid
```

Reiniciar Apache

```
systemctl restart apache2
```

---

## Execução

O front-end (index.html) acessa o server_manager.py via fetch para iniciar, parar ou verificar o status do servidor.

O WebSocket roda na porta 8082, TCP na 8080 e UDP na 8081.

### Clientes

TCP: tcp_client.py

UDP: udp_client.py

Ambos permitem enviar mensagens de teste para o servidor e verificar se elas aparecem na interface web via WebSocket.

### Fluxo de Mensagens

Um cliente envia mensagem via TCP ou UDP.

O servidor recebe a mensagem e cria um objeto JSON:

```
{
  "protocol": "TCP",
  "ip": "150.162.244.75",
  "timestamp": "2025-10-28T21:00:00",
  "content": "Mensagem de teste",
}
```

A mensagem é transmitida para todos os clientes conectados via WebSocket.

O front-end renderiza a mensagem com protocolo e IP.
