import sys
import signal
import logging
import socket
import asyncio
import json
import threading
import datetime
import websockets

# Configuração de log
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[logging.StreamHandler()]
)

logger = logging.getLogger(__name__)

# Config das portas
WS_PORT = 8082
TCP_PORT = 8080
UDP_PORT = 8081

# Lista de conexões WebSocket ativas
connected_clients = set()

# Lock para operações thread-safe
client_lock = threading.Lock()

async def register_client(websocket):
    """"Registra um novo cliente WebSocket."""
    with client_lock:
        connected_clients.add(websocket)
    logger.info(f"Número de clientes conectados: {len(connected_clients)}")

async def unregister_client(websocket):
    """Desregistra um cliente WebSocket."""
    with client_lock:
        connected_clients.remove(websocket)
    logger.info(f"Número de clientes conectados: {len(connected_clients)}")

async def ws_handler(websocket, path):
    """Gerencia as conexões WebSocket."""
    await register_client(websocket)
    try:
        # Mantém a conexão aberta para receber mensagens
        async for message in websocket:
            logger.info(f"Mensagem recebida de {websocket.remote_address}: {message}")

    except Exception as e:
        logger.error(f"Erro na conexão WebSocket: {e}")
    finally:
        await unregister_client(websocket)

async def broadcast_message(message_data):
    with client_lock:
        if not connected_clients:
            logger.info("Nenhum cliente conectado para enviar a mensagem.")
            return

        logger.info(f"Enviando mensagem para {len(connected_clients)} clientes.")

        # Converte a mensagem para JSON
        message_json = json.dumps(message_data)

        websockets_tasks = [websocket.send(message_json) for websocket in connected_clients]
        await asyncio.gather(*websockets_tasks)

def handle_tcp_client(connection, address):
    """Gerencia conexões TCP."""
    client_ip = address[0]
    logger.info(f"Cliente TCP conectado: {client_ip}")

    try:
        data = connection.recv(1024)
        if data:
            message = data.decode('utf-8').strip()
            logger.info(f"Mensagem TCP recebida de {client_ip}: {message}")

            message_data = {
                "protocol": "TCP",
                "ip": client_ip,
                "timestamp": datetime.datetime.now().isoformat(),
                "content": message
            }

            connection.sendall(f'Mensagem recebida: {message}\n'.encode('utf-8'))

            asyncio.run_coroutine_threadsafe(broadcast_message(message_data), asyncio.get_event_loop())

    except Exception as e:
        logger.error(f"Erro na conexão TCP com {client_ip}: {e}")
    finally:
        connection.close()
        logger.info(f"Cliente TCP desconectado: {client_ip}")

def start_tcp_server():
    """Inicia o servidor TCP."""
    tcp_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tcp_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    try:
        tcp_socket.bind(('0.0.0.0', TPC_PORT))
        tcp_socket.listen(5)
        logger.info(f"Servidor TCP iniciado na porta {TPC_PORT}")

        while True:
            conn, addr = tcp_socket.accept()
            threading.Thread(target=handle_tcp_client, args=(conn, addr)).start()
    except Exception as e:
        logger.error(f"Erro no servidor TCP: {e}")
    finally:
        tcp_socket.close()

def start_udp_server():
    """Inicia o servidor UDP."""
    udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    udp_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    try:
        udp_socket.bind(('0.0.0.0', UDP_PORT))
        logger.info(f"Servidor UDP iniciado na porta {UDP_PORT}")

        while True:
            data, addr = udp_socket.recvfrom(1024)
            client_ip = addr[0]

            if (data):
                message = data.decode('utf-8').strip()
                logger.info(f"Mensagem UDP recebida de {client_ip}: {message}")

                message_data = {
                    "protocol": "UDP",
                    "ip": client_ip,
                    "timestamp": datetime.datetime.now().isoformat(),
                    "content": message
                }

                # Responde ao cliente UDP
                udp_socket.sendto(f'Mensagem recebida: {message}\n'.encode('utf-8'), addr)

                # Envia a mensagem para os clientes WebSocket
                asyncio.run_coroutine_threadsafe(broadcast_message(message_data), asyncio.get_event_loop())

    except Exception as e:
        logger.error(f"Erro no servidor UDP: {e}")
    finally:
        udp_socket.close()

async def main():
    tcp_thread = threading.Thread(target=start_tcp_server, daemon=True)
    tcp_thread.start()

    udp_thread = threading.Thread(target=start_udp_server, daemon=True)
    udp_thread.start()

    async with websockets.serve(ws_handler, '0.0.0.0', WS_PORT):
        logger.info(f"Servidor WebSocket iniciado na porta {WS_PORT}")
        await asyncio.Future()  # Mantém o servidor rodando indefinidamente

def signal_handler(sig, frame):
    logger.info(f'Servidor WebSocket escutando na porta {WS_PORT}.')
    sys.exit(0)

if __name__ == '__main__':
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    asyncio.run(main())
