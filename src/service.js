<<<<<<< HEAD:src/service.js
const express = require("express");
const route = require('./routes.js');
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

=======
const express = require("express");
const route = require('./routes.js');
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

>>>>>>> 6b8bae496b8e81ab1352b706194ed7154969e1fe:service.js
app.listen(port, ()=>{console.log('running on port:', port)})