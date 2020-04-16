const express = require('express')
const { getAllTeams, getTeamById } = require('./controllers/teams')
const app = express()


app.get('/teams', getAllTeams)

app.get('/teams/:id', getTeamById)

// app.all('*', (request, response) => {
//   return response.sendStatus(404).send('Oh no! Not found!')
// })

app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 8080.')
})
