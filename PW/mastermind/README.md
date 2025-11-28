# 🎮 Mastermind - Jogo Web Multiplayer

Implementação web do clássico jogo de tabuleiro Mastermind utilizando stack MERN (MongoDB, Express.js, React, Node.js).

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 20.x ou superior ([Download](https://nodejs.org/))
- **MongoDB** 6.x ou superior ([Download](https://www.mongodb.com/try/download/community))
- **npm** ou **yarn** (incluído com Node.js)
- **Git** ([Download](https://git-scm.com/))

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/ligggght/Programacao-para-Web.git
cd Programacao-para-Web/mastermind
```

### 2. Configure o Backend

```bash
# Navegue para a pasta do backend
cd backend

# Instale as dependências
npm install

# Configure o arquivo .env
# Crie um arquivo chamado .env na pasta backend/ com:
```

**Arquivo `backend/.env`:**
```env
MONGO_URL=mongodb://localhost:27017/mastermind
```

> **Nota:** Se estiver usando MongoDB Atlas (nuvem), substitua pela sua connection string:
> ```
> MONGO_URL=mongodb+srv://usuario:senha@cluster.mongodb.net/mastermind
> ```

```bash
# Inicie o servidor backend
npm run dev
```

O backend estará rodando em `http://localhost:3001`

### 3. Configure o Frontend

Abra um **novo terminal** e execute:

```bash
# Volte para a pasta raiz do projeto (se ainda estiver em backend/)
cd ..

# Instale as dependências do frontend
npm install

# Configure o arquivo .env
# Crie um arquivo chamado .env na pasta mastermind/ com:
```

**Arquivo `mastermind/.env`:**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
IS_DEV=true
```

> **Nota:** Em produção, altere para:
> ```env
> NEXT_PUBLIC_API_BASE_URL=https://seu-dominio.com/api
> IS_DEV=false
> ```

```bash
# Inicie o servidor frontend
npm run dev
```

O frontend estará rodando em `http://localhost:3000`
