import os
import json
import cgi
import subprocess
import psutil

# Configuração
WEBSOCKET_SERVER_PATH = os.path.join(os.path.dirname(__file__), 'websocket_server.py')
PID_FILE = os.path.join(os.path.dirname(__file__), 'websocket_server.pid')

# Resposta HTTP
print("Content-Type: application/json")
print()

def is_server_running():
    """Verifica se o servidor WebSocket está em execução."""
    if not os.path.exists(PID_FILE):
        return False

    try:
        with open(PID_FILE, 'r') as f:
            pid = int(f.read())

            if psutil.pid_exists(pid):
                return True
    except Exception as e:
        print("Erro ao ler o arquivo PID.", e)

    return False

def start_server():
    """Inicia o servidor WebSocket."""
    if is_server_running():
        return {"success": False, "message": "Servidor já está em execução."}

    try:
        process = subprocess.Popen(["python3", WEBSOCKET_SERVER_PATH],
                                   stdout=subprocess.DEVNULL,
                                    stderr=subprocess.DEVNULL)

        # Salva o PID em um arquivo
        with open(PID_FILE, 'w') as f:
            f.write(str(process.pid))
        
        return {"success": True, "message": "Servidor iniciado com sucesso."}
    except Exception as e:
        return {"success": False, "message": f"Erro ao iniciar o servidor: {str(e)}"}

def stop_server():
    """Para o servidor WebSocket."""
    if not is_server_running():
        return {"success": False, "message": "Servidor não está em execução."}

    try:
        with open(PID_FILE, 'r') as f:
            pid = int(f.read())

        os.kill(pid, 9)  # Envia sinal SIGKILL

        # Remove o arquivo PID
        os.remove(PID_FILE)

        return {"success": True, "message": "Servidor parado com sucesso."}
    except Exception as e:
        return {"success": False, "message": f"Erro ao parar o servidor: {str(e)}"}

def get_status():
    """Retorna o status do servidor WebSocket."""
    if is_server_running():
        return {"status": "running", "message": "Servidor está em execução."}
    else:
        return {"status": "stopped", "message": "Servidor não está em execução."}
    
try:
    form = cgi.FieldStorage()
    action = form.getvalue('action', 'status')

    if action == 'start':
        response = start_server()
    elif action == 'stop':
        response = stop_server()
    else:
        response = get_status()

    print(json.dumps(response))

except Exception as e:
    print(json.dumps({"success": False, "message": f"Erro inesperado: {str(e)}"}))
