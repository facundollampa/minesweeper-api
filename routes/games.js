const express = require('express')
const { Game, GameCell } = require('../dbconnection')
const { createNewBoard } = require('../utils/board')

const gameRouter = express.Router()

gameRouter.get('/api/v1/game', async (request, response) => {
  const { id } = request.query
  let game = null
  let gameCells = null

  if (!id) {
    ({ game, gameCells } = createNewBoard())
    response.json({ game, gameCells })
  }

  game = await Game.findByPk(Number(id))
  if (!game) {
    response.status(404).json({
      error: 'Game not found'
    })
  }

  gameCells = await GameCell.findAll({
    where: {
      game_id: game.id
    }
  })
  response.json({ game, gameCells })
})

gameRouter.post('/api/v1/game', async (request, response) => {
  const gameInstance = request.body
  const { game, gameCells } = gameInstance

  if (!game || !gameCells) {
    response.status(400).json({
      error: 'Game content missing...'
    })
  }

  const newGame = await Game.create({ ...game, create_datetime: new Date(), modify_datetime: new Date() })
  const newGameCells = []

  for (const gameCell of gameCells) {
    const newGameCell = await GameCell.create({ ...gameCell, game_id: newGame.id })
    newGameCells.push(newGameCell)
  }

  response.status(201).json({ game: newGame, gameCells: newGameCells })
})

module.exports = gameRouter
