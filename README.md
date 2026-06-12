# 📚 Estante Viva

> Plataforma de leitura social — descubra livros gratuitos, conecte-se com outros leitores e participe de comunidades organizadas por autor, editora e gênero literário.

---

## 🚀 Sobre o Projeto

A **Estante Viva** é uma aplicação full-stack em desenvolvimento, criada como projeto de portfólio pessoal.

A visão do projeto é ser uma **rede social para leitores**: um lugar onde é possível explorar e baixar livros gratuitos, participar de fóruns de discussão, seguir autores favoritos e trocar recomendações com outros leitores — similar a um grupo do Facebook, mas focado 100% em literatura.

### Funcionalidades planejadas

- 📖 Catálogo de livros com busca e filtros por categoria, autor e editora
- ⬇️ Download de livros gratuitos (domínio público e licenças abertas)
- 💬 Fórum de discussão por livro, autor e gênero
- 👥 Comunidades de leitores (grupos temáticos)
- ⭐ Avaliações e resenhas
- 🔖 Estante pessoal (lendo, quero ler, já li)
- 🔔 Feed de atividades de leitores que você segue
- 🔐 Autenticação com login e perfil de usuário

---

## 🛠️ Tecnologias

### Backend
- **Node.js** — ambiente de execução
- **Express** — framework web
- **MySQL** — banco de dados relacional
- **mysql2** — driver de conexão com o banco
- **dotenv** — gerenciamento de variáveis de ambiente
- **JWT + bcrypt** *(em breve)* — autenticação e segurança

### Frontend
- **HTML5 + CSS3 + JavaScript puro** — sem frameworks, para consolidar os fundamentos

### Arquitetura
```
routes → controllers → services → data (MySQL)
```
Separação clara de responsabilidades em camadas: rotas, controllers, regras de negócio (services) e acesso ao banco (data).

---

## ⚙️ Como rodar localmente

### Pré-requisitos
- Node.js instalado
- MySQL instalado e rodando

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/jonethon5/estante-viva.git

# 2. Entre na pasta do projeto
cd estante-viva

# 3. Instale as dependências
npm install

# 4. Crie o arquivo .env na raiz com as variáveis abaixo
```

Crie um arquivo `.env` com:
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=estante_viva
```

```bash
# 5. Crie o banco de dados no MySQL
# Execute o SQL abaixo no MySQL Workbench ou terminal:
```

```sql
CREATE DATABASE estante_viva;
USE estante_viva;

CREATE TABLE livros (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  image TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL
);
```

```bash
# 6. Inicie o servidor
node server.js
```

O servidor estará rodando em `http://localhost:3000`.

---

## 📡 Endpoints da API

Base URL: `http://localhost:3000/api/books`

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/livros` | Lista todos os livros | Não |
| GET | `/livros/:id` | Busca livro por ID | Não |
| POST | `/livros` | Cria um novo livro | Sim (x-api-key) |
| PATCH | `/livros/:id` | Atualiza livro parcialmente | Sim (x-api-key) |
| DELETE | `/livros/:id` | Remove um livro | Sim (x-api-key) |

### Filtros disponíveis (GET /livros)
```
?category=Fantasia        → filtra por categoria
?stock=true               → apenas livros em estoque
```

### Exemplo de body (POST/PATCH)
```json
{
  "title": "Sapiens",
  "author": "Yuval Noah Harari",
  "category": "História",
  "price": 49.90,
  "stock": 10,
  "image": "https://url-da-imagem.jpg"
}
```

---

## 📁 Estrutura do Projeto

```
estante-viva/
├── frontend/
│   └── assets/
│       ├── css/
│       ├── js/
│       └── index.html
├── src/
│   ├── controllers/
│   │   └── booksController.js
│   ├── data/
│   │   └── booksData.js
│   ├── middlewares/
│   │   ├── logger.js
│   │   └── requireApiKey.js
│   ├── routes/
│   │   └── booksRoutes.js
│   ├── services/
│   │   └── booksService.js
│   └── db.js
├── .env (não versionado)
├── .gitignore
├── package.json
└── server.js
```

---

## 📈 Evolução do Projeto

- [x] CRUD de livros com mock (array em memória)
- [x] Arquitetura em camadas (routes/controllers/services/data)
- [x] Migração para MySQL
- [ ] Busca e filtros avançados
- [ ] Autenticação com JWT
- [ ] Frontend integrado com a API
- [ ] Comunidades e fórum
- [ ] Marketplace de livros usados (troca e venda)
- [ ] Download de livros gratuitos
- [ ] Avaliações e resenhas
- [ ] Feed social

---

## 👨‍💻 Autor

Desenvolvido por **Jonathan** como projeto de portfólio pessoal.

> *"Aprendo melhor na prática — esse projeto é prova disso."*