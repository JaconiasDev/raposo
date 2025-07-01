
const qrcode = require("qrcode-terminal")

 function qrCodeGeneration(qr){
    qrcode.generate( qr, {
        small: true
    })
}

module.exports = { qrCodeGeneration };