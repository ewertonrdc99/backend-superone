const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "🚀 Backend SuperOne rodando liso!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`));

app.post("/resposta-inteligente", (req, res) => {
  const { numeroCliente, mensagem } = req.body;

  // Lógica simples só pra testar
  let resposta = "🤖 Ainda estou aprendendo, mas recebi: " + mensagem;

  res.json({
    resposta,
    enviadoPara: numeroCliente
  });
});
