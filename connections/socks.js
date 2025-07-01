const initAuth = require('../Auth/auth');
const { default: makeWASocket } = require('@whiskeysockets/baileys');
const { qrCodeGeneration } = require('../qr/qrocodeConnected.js');
const pino = require("pino");


async function CreateSocker() {
  const { state, saveCreds } = await initAuth();

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true, browser: ['Ubuntu', 'Chrome', '109.0.0.0'], // versão estável
    logger: pino({ level: 'silent' }),
    
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ connection, qr }) => {
    if (qr) {
      qrCodeGeneration(qr);
    }

    if (connection === 'open') {
      console.log('✅ Conectado ao WhatsApp com sucesso!');
    }

    if (connection === 'close') {
      console.log('❌ Desconectado do WhatsApp!');
    }
  });
  

  return sock;
}

module.exports = { CreateSocker };
