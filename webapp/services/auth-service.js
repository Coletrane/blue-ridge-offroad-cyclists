import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from "amazon-cognito-identity-js"

const userPool = new CognitoUserPool({
  UserPoolId: process.env.COGNITO_POOL_ID,
  ClientId: process.env.COGNITO_CLIENT_ID
})

export const register = async user => {
  console.log(process.env.COGNITO_POOL_ID)
  console.log(process.env.COGNITO_CLIENT_ID)
  const attributes = [
    new CognitoUserAttribute({
      Name: "name",
      Value: user.name
    }),
    new CognitoUserAttribute({
      Name: "address",
      Value: user.address
    }),
    new CognitoUserAttribute({
      Name: "email",
      Value: user.email
    })
  ]
  if (user.phone) {
    attributes.push(
      new CognitoUserAttribute({
        Name: "phone_number",
        Value: user.phone
      })
    )
  }

  userPool.signUp(user.email, user.password, attributes, null, (err, data) => {
    if (err) {
      return Promise.reject(err)
    }

    return Promise.resolve(data.user)
  })
}
