const express = require('express')
const { default: mongoose } = require('mongoose')
const { EXPRESS_CONFIG, MONGO_CONFIG } = require('./config')
const { categoryRouter } = require('./routes/categories.router')
const { globoRouter } = require('./routes/globos.router')

const app = express()

app.use(express.json())

app.use('/globos', globoRouter)
app.use('/category', categoryRouter)

//coneccion a base de datos mongo
mongoose.connect(MONGO_CONFIG.URI)
    .then(() => console.log({ message: 'base de datos conectada' }))
    .catch(() => console.log({ message: 'base de datos NO conectada' }))

app.listen(EXPRESS_CONFIG.PORT,
    () => console.log("app listening to port", EXPRESS_CONFIG.PORT))