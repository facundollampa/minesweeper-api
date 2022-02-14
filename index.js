
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const gameRouter = require('./routes/games')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Minesweeper API</h1>')
})

app.use(gameRouter)
app.use((request, response, next) => {
  response.status(404).end()
})

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(`Server port: ${PORT}`)
})

module.exports = { app, server }
