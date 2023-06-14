const express = require("express");
const route = require('./routes.js');
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

app.use('/post', route)

app.listen(3001, ()=>{console.log('running on port 3001')})