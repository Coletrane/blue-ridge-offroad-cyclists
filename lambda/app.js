const express = require('express')
const next = require('next')
const AWS = require('aws-sdk')
const bodyParser = require('body-parser')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = app.getRequestHandler()

const init = require('./init.js')

nextApp.prepare()
  .then(() => {
    const app = express()

    app.use(bodyParser.json())

    // table names
    const DONATIONS_TABLE = process.env.DONATIONS_TABLE

    AWS.config.update({ region: process.env.REGION })

    const dynamoDb = new AWS.DynamoDB.DocumentClient()

    // API
    const API_ROUTE = '/api'
    // app.get('/users/')

    const donations = require('./db/donations')
    app.post(`${API_ROUTE}/donations`, (req, res) => {

      donations.model.forEach(field => {
        if (!req.body.donation[field]) {
          const errStr = `Required field: ${field} is null`
          console.error(errStr)
          res.status(400).json({
            message: errStr
          })
          return res
        }
      })

      // TODO: see if handling is needed here
      // try {
      const donation = donations.create(dynamoDb, req.body.donation)
      res.json(donation)
      return res
      // } catch (err) {
      //   console.error(err)
      //   res.status(500).json({
      //     message: err
      //   })
      // }
    })

    app.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })