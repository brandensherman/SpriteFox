const Sequelize = require('sequelize')
const db = require('../db')

const Frame = db.define('frame', {
  List: {
    type: Sequelize.JSON,
}})

module.exports = Frame
