const teams = require('../teams')

const getAllTeams = (request, response) => {
  return response.send(teams)
}

const getTeamById = (request, response) => {
  const { id } = request.params

  const matchingTeam = teams.find((team) => team.id === Number(id))

  return matchingTeam
    ? response.send(matchingTeam)
    : response.sendStatus(404)
}

const getNewId = () => {
  const lastId = teams.reduce((acc, team) => {
    return team.id > acc ? team.id : acc
  }, 0)

  return lastId + 1
}

const saveNewTeam = (request, response) => {
  const {
    location, mascot, abbreviation, conference, division
  } = request.body

  if (!location || !mascot || !abbreviation || !conference || !division) {
    return response.status(400).send('All fields are required.')
  }

  const newTeam = {
    location, mascot, abbreviation, conference, division, id: getNewId()
  }

  teams.push(newTeam)

  return response.status(201).send(newTeam)
}

module.exports = { getAllTeams, getTeamById, saveNewTeam }
