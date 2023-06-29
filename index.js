const express = require('express');
const bodyParser = require('body-parser');
const qr = require('qr-image');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Front-end/index.html');
});

app.post('/convert', (req, res) => {
  const url = req.body.url;
  const qrCode = qr.image(url, { type: 'png' });
  res.type('png');
  qrCode.pipe(res);
});

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
