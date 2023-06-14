const express = require("express");
const route = require('./routes.js');
const cors = require('cors')

const port = process.env.PORT || 3001

const app = express()

app.use(cors())

app.use(express.json())

app.use('/post', route)

app.listen(port, ()=>{console.log('running on port:', port)})