const teams = require('../teams') // THIS LINE TO BE DELETED
const models = require('../models')


const getAllTeams = async (request, response) => {
  const teams = await models.teams.findAll()

  return response.send(teams)
}

const getTeamById = async (request, response) => {
  const { id } = request.params

  const matchingTeam = await teams.find((team) => team.id === Number(id))
  //   const foundHero = await models.heroes.findOne({ where: { slug } })

  return matchingTeam
    ? response.send(matchingTeam)
    : response.sendStatus(404)
}

// const getNewId = () => {
//   const lastId = teams.reduce((acc, team) => {
//     return team.id > acc ? team.id : acc
//   }, 0)

//   return lastId + 1
// }

const saveNewTeam = async (request, response) => {
  const {
    location, mascot, abbreviation, conference, division
  } = request.body

  if (!location || !mascot || !abbreviation || !conference || !division) {
    return response.status(400).send('All fields are required.')
  }

  const newTeam = await models.teams.create({
    location, mascot, abbreviation, conference, division, id: getNewId()
  })

  return response.status(201).send(newTeam)
}

module.exports = { getAllTeams, getTeamById, saveNewTeam }
