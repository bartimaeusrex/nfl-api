const Sequelize = require('sequelize')
const teamsModel = require('./teams')

const connection = new Sequelize('teams', 'teams', 'funky##Chicken', {
  host: 'localhost', dialect: 'mysql'
})

const teams = teamsModel(connection, Sequelize)

module.exports = { teams }
