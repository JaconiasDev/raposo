const  axios = require("axios");
const  dotenv = require("dotenv")

dotenv.config();

const API_URL = process.env.URL_API_LLM; // rota  post !
const API_KEY =  process.env.API_KEY;

async function askGroq(message) {
  try {
     const responseIA = await axios.post(
      API_URL,
      {
        model:process.env.MODELO_LLM,
          messages: [

            { role: "system", content:`${process.env.ROLE_SYSTEM_LLM}`},
            { role: "user", content: message },

          ],
        },

      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }

    );

    const reply = responseIA.data.choices[0].message.content;
    return reply;


  } catch (err) {
    console.error("Erro ao chamar Groq API:", err.response?.data || err.message);
  }
}


module.exports = {askGroq};
