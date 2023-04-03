const express = require('express');

const PORT = process.env.PORT || 8000;

const server = express();

server.use(express.json());

server.use(`/api/stores`, require('./Routes/stores'));

try {
  server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
} catch (err) {
  console.error(err);
}