const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { describe, it } = require('mocha')
const { teamsList, singleTeam, postedTeam } = require('../mocks/teams')
const { getAllTeams, getTeamById, saveNewTeam } = require('../../controllers/teams')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - teams', () => {
  describe('getAllTeams', () => {
    it('retrieves a list of teams from the database and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.Teams, 'findAll').returns(teamsList) // wrapping the findAll() function
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAllTeams({}, response)

      expect(stubbedFindAll).to.have.callCount(1) // asserting that the stub function actually got called
      expect(stubbedSend).to.have.been.calledWith(teamsList)
    })
  })

  describe('getTeamById', () => {
    // eslint-disable-next-line max-len
    it('retrieves the team associated with the provided id from the database and calls response.send with it', async () => {
      const request = { params: { id: '13' } }
      const stubbedFindOne = sinon.stub(models.Teams, 'findOne').returns(singleTeam)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getTeamById(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: '13' } })
      expect(stubbedSend).to.have.been.calledWith(singleTeam)
    })
  })


  describe('saveNewTeam', () => {
    // eslint-disable-next-line max-len
    it('accepts new team details and saves them as a new team, returning the saved record with a 201 status', async () => {
      const request = { body: postedTeam }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }
      const stubbedCreate = sinon.stub(models.Teams, 'create').returns(singleTeam)

      await saveNewTeam(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedTeam)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(singleTeam)
    })
  })
})
