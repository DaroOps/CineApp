const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

function encrypt(text) {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return String.fromCharCode(code + 1);
  }).join('');
}


function decrypt(text) {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return String.fromCharCode(code - 1);
  }).join('');
}


app.post('/encrypt', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Se requiere un texto para encriptar' });
  }
  const encryptedText = encrypt(text);
  res.json({ result: encryptedText });
});


app.post('/decrypt', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Se requiere un texto para desencriptar' });
  }
  const decryptedText = decrypt(text);
  res.json({ result: decryptedText });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});