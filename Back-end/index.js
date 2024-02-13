const express = require('express')
const { EXPRESS_CONFIG } = require('./config')

const app = express()

app.use(express.json())

app.listen(EXPRESS_CONFIG.PORT, () => console.log("app listening to port", EXPRESS_CONFIG.PORT))