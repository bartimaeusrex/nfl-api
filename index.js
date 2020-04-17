const express = require('express')
const bodyParser = require('body-parser')
const { getAllTeams, getTeamById, saveNewTeam } = require('./controllers/teams')
const app = express()

app.get('/teams', getAllTeams)

app.get('/teams/:id', getTeamById)

app.post('/teams', bodyParser.json(), saveNewTeam)

app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 8080.')
})
