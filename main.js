require('dotenv').config();
const express = require('express');
const path = require('node:path');
const router = require('./src/routes/index.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
