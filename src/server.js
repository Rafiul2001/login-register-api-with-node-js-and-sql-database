const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const login = require('./login-register-module/login')
const register = require('./login-register-module/register')

const PORT = 3000
const HOST = '0.0.0.0'
const app = express()

app.use(cors())
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/login', login)
app.use('/register', register)

app.get('/', (req, res) => {
    res.send("Login and Register module!")
})

app.listen(PORT, HOST, () => {
    console.log(`Listening to http://localhost:${PORT}`)
})