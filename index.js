const connectToMongo = require('./db');
const express = require('express');
// const cors = require('cors')
const bodyParser = require('body-parser');

require('dotenv').config();

connectToMongo();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');
const port = process.env.port


//Routes for movies
app.use('/', require('./routes/movies'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})