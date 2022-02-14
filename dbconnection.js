require('dotenv').config()
// const mysql = require('mysql2')
const { Sequelize, DataTypes } = require('sequelize')
const GameModel = require('./models/Game')
const GameCellModel = require('./models/GameCell')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT
})

const Game = GameModel(sequelize, DataTypes)
const GameCell = GameCellModel(sequelize, DataTypes)

Game.hasMany(GameCell, {
  foreignKey: 'game_id'
})
GameCell.belongsTo(Game, {
  foreignKey: 'game_id'
})

sequelize.sync({ force: false })
  .then(() => {
    console.log('Synced...')
  })

module.exports = {
  sequelize,
  Game,
  GameCell
}
