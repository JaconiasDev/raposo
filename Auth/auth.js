const { useMultiFileAuthState } = require('@whiskeysockets/baileys');

async function initAuth() {
  const result = await useMultiFileAuthState("auth_info_baileys");
  return result;
}

module.exports = initAuth;
