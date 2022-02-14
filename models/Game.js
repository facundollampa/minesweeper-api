module.exports = (sequelize, DataTypes) => {
  return sequelize.define('game', {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    game_status: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    timer_value: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mined_cell_found_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mined_cell_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    row_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    col_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    create_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    modify_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true
  })
}
