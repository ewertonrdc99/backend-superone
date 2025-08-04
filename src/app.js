const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// 🔍 Rota de verificação
app.get("/", (req, res) => {
  res.json({ message: "🚀 Backend SuperOne rodando liso com IA!" });
});

// 🤖 Rota principal com inteligência artificial
app.post("/resposta-inteligente", async (req, res) => {
  const { numeroCliente, mensagem } = req.body;

  try {
    // 🧠 Chamada à IA da DeepSeek
    const iaResponse = await axios.post(
      "https://api.deepseek.com/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "Você é um assistente útil e educado." },
          { role: "user", content: mensagem }
        ]
      },
      {
        headers: {
          "Authorization": "Bearer sk-15612cffa56a4652b94913963b27af91",
          "Content-Type": "application/json"
        }
      }
    );

    const resposta = iaResponse.data.choices[0].message.content;

    // 📲 Envio da resposta para o WhatsApp via WAHA
    await axios.post("http://191.252.60.42:3000/message/sendText", {
      chatId: numeroCliente,
      text: resposta
    });

    res.json({
      status: "✅ Mensagem enviada com IA!",
      enviadoPara: numeroCliente,
      resposta
    });

  } catch (error) {
    console.error("Erro:", error.message);
    res.status(500).json({ erro: "Falha ao gerar ou enviar resposta com IA" });
  }
});

// 🌐 Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`));
