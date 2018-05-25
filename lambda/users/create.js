const uuid = require('uuid')
const db = require('./dynamodb')
const moment = require('moment')
const axios = require('axios')
require('dotenv').config()

addressVerificationApiUrl = ``

const requiredFields = [
  {
    field: 'email',
    type: 'string'
  },
  {
    field: 'name',
    type: 'string'
  },
  {
    field: 'street',
    type: 'string'
  },
  {
    field: 'city',
    type: 'string'
  },
  {
    field: 'zip',
    type: 'number'
  },
  {
    field: 'birthday',
    type: 'string'    // UTC ISO string
  }
]

module.exports.create = (event, context, callback) => {
  const timestamp = moment().utc().toISOString()
  const data = JSON.parse(event.data)

  // Check event data against required types
  requiredFields.forEach(obj => {
    if (typeof data[obj.field] !== obj.type) {
      const errString = `Validation failed ${data[obj.field]} is not a ${obj.type}`
      console.error(errString)
      callback(null, {
        statusCode: 400,
        headers: {'Content-Type': 'text/plain'},
        body: errString
      })
    }
  })

  // Verify birthday is a valid ISO String
  if (!moment(data.birthday).isValid()) {
    const errString = `${data.birthday} is not a valid ISO string!`
    console.error((errString))
    callback(null, {
      statusCode: 400,
      headers: {'Content-Type': 'text/plain'},
      body: errString
    })
  }

  // TODO: verify address


  const params = {
    TableName: process.env.USERS_TABLE,
    Item: {
      id: uuid.v1(),
      email: data.email,
      name: data.name,
      // TODO: sanitize commas on the front end
      address: `${data.street}, ${data.city}, ${data.zip}`,
      birthday: data.birthday
    }
  }
  // Write to DB
  db.put(params, (err, user) => {
    if (err) {
      console.error(err)
      callback(null, {
        statusCode: error.statusCode || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: `DB error creating user: ${JSON.stringify(data)}`,
      })
      return
    }

    const res = {
      statusCode: 200,
      body: JSON.stringify(data)
    }
    callback(null, res)
  })
}