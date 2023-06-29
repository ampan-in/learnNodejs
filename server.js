const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql2')
require('dotenv').config();

const app = express();

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

const productRoute = require('./src/routers/products')
const userRoute = require('./src/routers/users')

app.use('/api', userRoute)
app.use('/api',productRoute)


const port = 3000
app.listen(port, () => console.log(`Start Server Port: ${port}`));
