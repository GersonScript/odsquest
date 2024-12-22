// Importando dependências
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const port = 3000;

// Configurar o middleware para manipular dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Usar o Helmet para aumentar a segurança dos cabeçalhos HTTP
app.use(helmet());

// Serve arquivos estáticos da pasta 'public' (onde estará o HTML)
app.use(express.static("public"));

// Rota para a página inicial (formulário HTML)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Conectar ao banco de dados MySQL de maneira segura
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Usar variáveis de ambiente para credenciais
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados");
  }
});

// Função para validar os dados da requisição
const validarDados = (dados) => {
  // Validação básica (exemplo)
  if (!dados.usuario || !dados.email || !dados.idade || !dados.estado) {
    return false;
  }
  // Validar formato de e-mail
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(dados.email)) {
    return false;
  }
  return true;
};

// Função para verificar se o email ou nome de usuário já existe
const verificarDuplicidade = (email, usuario, callback) => {
  const query = `SELECT * FROM usuarios WHERE email = ? OR apelido = ?`;
  db.query(query, [email, usuario], (err, results) => {
    if (err) {
      console.error("Erro ao verificar duplicidade:", err.message);
      callback(err);
    } else {
      // Se encontrar algum resultado, significa que o email ou apelido já existe
      callback(null, results.length > 0);
    }
  });
};

// Rota para criar conta
app.post("/criar-conta", (req, res) => {
  const { usuario, email, idade, estado, nomeEscola, cidade, municipio, ano } =
    req.body;

  // Validar os dados antes de inserir no banco
  if (!validarDados(req.body)) {
    return res
      .status(400)
      .json({
        error: "Dados inválidos. Por favor, verifique os campos obrigatórios.",
      });
  }

  // Verificar duplicidade de email ou nome de usuário
  verificarDuplicidade(email, usuario, (err, existe) => {
    if (err) {
      return res
        .status(500)
        .json({
          error: "Erro ao verificar dados. Tente novamente mais tarde.",
        });
    }

    if (existe) {
      return res.status(400).json({
        error:
          "Email ou nome de usuário já existe. Por favor, escolha outro email ou nome de usuário.",
      });
    }

    // Query para inserir os dados no banco
    const query = `
      INSERT INTO usuarios (apelido, email, idade, estado, nome_escola, cidade, municipio, ano_escolar)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [usuario, email, idade, estado, nomeEscola, cidade, municipio, ano],
      (err, result) => {
        if (err) {
          console.error("Erro ao inserir usuário:", err.message);
          res
            .status(500)
            .json({
              error: "Erro ao criar conta. Tente novamente mais tarde.",
            });
        } else {
          console.log("Usuário criado com sucesso:", result);
          res.status(200).json({ message: "Conta criada com sucesso!" });
        }
      }
    );
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
