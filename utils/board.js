const MAX_MINE_AMOUNT = 10
const ROW_COUNT = 8
const COL_COUNT = 8

const createNewBoard = () => {
  const newGame = createNewGame()
  const newGameCells = createNewGameCells()
  return { game: newGame, gameCells: newGameCells }
}

const createNewGame = () => {
  const currentDate = new Date()

  return {
    game_status: 'STARTED',
    timer_value: 0,
    mined_cell_found_count: 0,
    mined_cell_count: 10,
    row_count: 8,
    col_count: 8,
    create_datetime: currentDate,
    modify_datetime: currentDate
  }
}

const createNewGameCells = () => {
  const newGameCells = []

  for (let i = 1; i <= ROW_COUNT; i++) {
    for (let j = 1; j <= COL_COUNT; j++) {
      const baseCell = createNewBaseCell()
      const newGameCell = {
        row_pos: i,
        col_pos: j,
        cell_type: baseCell.type,
        cell_status: baseCell.status,
        cell_value: baseCell.value
      }

      newGameCells.push(newGameCell)
    }
  }
  return newGameCells
}

const createNewBaseCell = () => {
  const cellTypes = ['REGULAR', 'MINE']
  const cellStatus = ['COVERED', 'UNCOVERED', 'FLAGGED']
  let mineCount = 0
  let type = null
  let value = null
  const status = cellStatus[Math.floor(Math.random() * cellStatus.length)]
  do {
    type = cellTypes[Math.floor(Math.random() * cellTypes.length)]

    if (type === 'REGULAR') {
      value = Math.floor(Math.random() * 5)
    } else if (type === 'MINE') {
      mineCount++
    }
  } while (type === 'MINE' && mineCount >= MAX_MINE_AMOUNT)

  return { type, status, value }
}

module.exports = { createNewBoard }
