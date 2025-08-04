const express = require("express");
const axios = require("axios"); // para enviar resposta pro WAHA
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "🚀 Backend SuperOne rodando liso!" });
});

app.post("/resposta-inteligente", async (req, res) => {
  const { numeroCliente, mensagem } = req.body;

  let resposta = "";

  // 💡 Lógica inteligente simples
  if (mensagem.toLowerCase().includes("desconto")) {
    resposta = "🎉 Você ganhou 10% de desconto! Use o cupom SUPER10.";
  } else if (mensagem.toLowerCase().includes("oi") || mensagem.toLowerCase().includes("olá")) {
    resposta = "👋 Olá! Como posso te ajudar hoje?";
  } else {
    // Aqui você poderia usar Copilot ou ChatGPT, mas vamos manter simples
    resposta = "🤖 Ainda estou aprendendo, mas recebi: " + mensagem;
  }

  // 🚀 Envia a resposta pro WhatsApp via WAHA
  try {
    await axios.post("https://api.waha.com.br/send-message", {
      to: numeroCliente,
      message: resposta,
      token: process.env.TOKEN_WAHA // ideal usar variáveis de ambiente!
    });

    res.json({
      status: "✅ Enviado com sucesso",
      enviadoPara: numeroCliente,
      resposta
    });
  } catch (err) {
    console.error("Erro ao enviar para WAHA:", err.message);
    res.status(500).json({ erro: "Falha ao enviar mensagem" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`));
