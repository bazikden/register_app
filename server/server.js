require('dotenv').config()
const express = require('express')
const { PORT } = require('./config/keys')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

// Headers
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

// Routes
app.use('/confirences', require('./routes/confirences'))
app.use('/admin', require('./routes/admin'))

app.listen(PORT, () => console.log(`Server is started on port ${PORT}`))