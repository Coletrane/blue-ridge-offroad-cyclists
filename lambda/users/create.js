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

// FIXME: just here for documentation
const optionalFields = [
  {
    field: 'phoneNumber',
    type: 'number'
  },
  {
    field: 'noEmail',
    type: 'boolean',
    default: false
  },
  {
    field: 'isMember',
    type: 'boolean',
    default: false
  },
  {
    field: 'autoRenew',
    type: 'boolean',
    default: true
  },
  {
    field: 'memberUntil',
    type: 'string'
  }
]

module.exports = (event, context, callback) => {
  const timestamp = moment().utc().toISOString()
  const reqBody = JSON.parse(event.data)

  // Check event data against required types
  requiredFields.forEach(obj => {
    if (!reqBody[obj.field] || typeof reqBody[obj.field] !== obj.type) {
      const errString = `Validation failed ${reqBody[obj.field]} is not a ${obj.type}`
      console.error(errString)
      callback(null, {
        statusCode: 400,
        headers: {'Content-Type': 'text/plain'},
        body: errString
      })
    }
  })

  // Verify birthday is a valid ISO String
  if (!moment(reqBody.birthday).isValid()) {
    const errString = `${reqBody.birthday} is not a valid ISO string!`
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
      email: reqBody.email,
      name: reqBody.name,
      // TODO: sanitize commas on the front end
      address: `${reqBody.street}, ${reqBody.city}, ${reqBody.zip}`,
      birthday: reqBody.birthday,
      phoneNumber: reqBody.phoneNumber,
      noEmail: reqBody.noEmail || false,
      isMember: reqBody.isMember || false,
      autoRenew: reqBody.autoRenew || false,
      memberUntil: reqBody.memberUntil,
      dateCreated: timestamp,
      dateUpdated: timestamp
    }
  }

  // Write to DB
  db.put(params, (err, user) => {
    if (err) {
      console.error(err)
      callback(null, {
        statusCode: error.statusCode || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: `DB error creating user: ${JSON.stringify(reqBody)}`,
      })
      return
    }

    const res = {
      statusCode: 200,
      body: JSON.stringify(user)
    }
    callback(null, res)
  })
}