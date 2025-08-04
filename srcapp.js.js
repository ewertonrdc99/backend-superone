const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "🚀 Backend SuperOne rodando liso!" });
});

app.post("/resposta-inteligente", (req, res) => {
  const pergunta = req.body.perguntaCliente || "";
  res.json({ resposta: `🤖 Ainda estou aprendendo, mas recebi: "${pergunta}"` });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
