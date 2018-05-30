const uuid = require('uuid')
const moment = require('moment')

exports.model = [
  {
    field: 'userId',
    type: 'number'
  },
  {
    field: 'amount',
    type: 'number'
  },
  {
    field: 'payMethod',
    type: 'string'
  }
]

const DONATIONS_TABLE = process.env.DONATIONS_TABLE
exports.create = (dynamoDb, donation) => {
  donation.id = uuid.v1()
  donation.createdAt = moment().utc().toISOString()
  dynamoDb.put({
    Item: donation,
    TableName: DONATIONS_TABLE
  }, (err, data) => {
    if (err) {
      throw new Error(err)
    } else {
      return data
    }
  })
}