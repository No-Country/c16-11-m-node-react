const express = require('express')
// Importar express-fileupload para manejar la carga de archivos
const fileUpload = require('express-fileupload')
const { default: mongoose } = require('mongoose')
const morgan = require('morgan')
const { EXPRESS_CONFIG, MONGO_CONFIG } = require('./config')
// Importar los enrutadores de las rutas de la aplicación
const { categoryRouter } = require('./routes/categories.router')
const { decoracionRouter } = require('./routes/decoraciones.router')
const { detallesRouter } = require('./routes/detalles.router')
const { EmpresasRouter } = require('./routes/empresas.router')
const { globoRouter } = require('./routes/globos.router')
const { productRouter } = require('./routes/products.router')

const app = express()

// Usar el middleware morgan para registrar las solicitudes HTTP en modo 'dev'
app.use(morgan('dev'))

// Usar express.json() para analizar los cuerpos de las solicitudes en formato JSON
app.use(express.json())

// Usar express-fileupload para manejar la carga de archivos temporales
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}))

// Asignar las rutas de los enrutadores a las rutas de la aplicación
//https://c16-11-m-node-react-3.onrender.com/products
app.use('/products', productRouter)

//https://c16-11-m-node-react-3.onrender.com/category
app.use('/category', categoryRouter)

//https://c16-11-m-node-react-3.onrender.com/decoraciones
app.use('/decoraciones', decoracionRouter)

//https://c16-11-m-node-react-3.onrender.com/globos
app.use('/globos', globoRouter)

//https://c16-11-m-node-react-3.onrender.com/detalles
app.use('/detalles', detallesRouter)

//https://c16-11-m-node-react-3.onrender.com/empresas
app.use('/empresas', EmpresasRouter)

// Conectar a la base de datos MongoDB utilizando la URI proporcionada
mongoose.connect(MONGO_CONFIG.URI)
    .then(() => console.log({ message: 'base de datos conectada' }))
    .catch(() => console.log({ message: 'base de datos NO conectada' }))

// Iniciar el servidor Express y escuchar en el puerto especificado en la configuración
app.listen(EXPRESS_CONFIG.PORT || 3000,
    () => console.log("app listening to port", EXPRESS_CONFIG.PORT))