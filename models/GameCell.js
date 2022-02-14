module.exports = (sequelize, DataTypes) => {
  return sequelize.define('game_cell', {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    row_pos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    col_pos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cell_type: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    cell_status: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    cell_value: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    game_id: {
      type: DataTypes.BIGINT(20),
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true
  })
}
