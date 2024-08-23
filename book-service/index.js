const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/db');

const app = express();

dbConnection();

app.use(cors());

app.use(express.json()); 

app.use('/books', require('./routes/books'));

app.listen(process.env.PORT, () => {
    console.log(`Conexión con el servidor establecida en el puerto ${process.env.PORT}`)
})