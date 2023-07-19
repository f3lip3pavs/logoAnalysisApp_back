const express = require("express");
const route = require('./src/routes.js');
const cors = require('cors')
const chromium = require('chromium')
const config = require('./node_modules/chromium/config');
const path = require('path');

config.BIN_OUT_PATH = path.join(__dirname, '.cache/puppeteer/chrome/win64-114.0.5735.133/chrome-win64')

chromium.install().then(function() {
    console.log('chromium instalado')
    console.log(chromium.path)
});

const port = process.env.PORT || 3001

const app = express()

app.use(cors())

app.use(express.json())

app.use('/post', route)

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/post', (req, res) => {
    res.send('Hello post')
})

app.get('/post/up', (req, res) => {
    res.send('Hello up')
})

app.listen(port, ()=>{console.log('running on port:', port)})