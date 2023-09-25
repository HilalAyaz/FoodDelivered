const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

const createUsers = require('./routes/createUsers')
const loginUser = require('./routes/loginUser')
const menuItems = require('./routes/menuItems')
const orderData = require('./routes/orderData')

const dbConnect = require('./database/database')
dbConnect()

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
  })
)

app.use(express.json())

app.use('/api', createUsers)
app.use('/api', loginUser)
app.use('/api', menuItems)
app.use('/api', orderData)

app.get('/', function (req, res) {
  res.send(`Express is listening!`)
})

app.listen(port, () => {
  console.log(`Express is listening on port ${port}!`)
})
