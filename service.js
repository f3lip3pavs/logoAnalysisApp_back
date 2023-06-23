const express = require("express");
const route = require('./src/routes.js');
const cors = require('cors')

//https://pptr.dev/troubleshooting

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