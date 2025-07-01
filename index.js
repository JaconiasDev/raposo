const { CreateSocker } = require('./connections/socks');
const { askGroq } = require("./Chat_IA/chat")
const  dotenv = require("dotenv")

dotenv.config();

async function init() {
  try {
    const sock = await CreateSocker();

    sock.ev.on('messages.upsert', async ({ messages }) => {
      const msg = messages[0]

      if (!msg.message) return

      const sender = msg.key.remoteJid
      const text = msg.message.conversation || msg.message.extendedTextMessage?.text

      // mensagem de sistema!
      const systemTypes = [
        'protocolMessage',
        'senderKeyDistributionMessage',
        'messageContextInfo',
        'reactionMessage',
      ];

      const messageType = Object.keys(msg.message || {})[0];

      if (systemTypes.includes(messageType)) {
        console.log(`⚠️ Ignorado: tipo de sistema (${messageType})`);
        return;
      }


      console.log(`📩 Nova mensagem de ${sender}: ${text}`)

      if (!text) return;

      if (text.toLowerCase().includes(`${process.env.DISPARO}`) || text.toLowerCase().includes("raposo")) {

        var IAresponse = await askGroq(text);

        await sock.sendMessage(sender, { text: IAresponse })
      }
    })


  } catch (err) {
    console.error('Erro ao iniciar o socket:', err);
  }
};

init();
