//Entry point for the server
const express = require('express');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => res.send('<h1>Hello Express</h1>'));

app.listen(PORT, console.log('Server is running on port: ' + PORT));