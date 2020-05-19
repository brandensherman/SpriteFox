const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true,
  },
  hash: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
})

module.exports = Room
