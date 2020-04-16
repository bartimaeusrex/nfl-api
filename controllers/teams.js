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

module.exports = { getAllTeams, getTeamById }
