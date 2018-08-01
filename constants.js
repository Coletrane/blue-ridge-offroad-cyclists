export const githubUrl = "http://github.com/coletrane/rimba-member-manager"
export const baseUrl =
  process.env.NODE_ENV === "production" ? "TBD" : "http://localhost:3000/"
export const authConfig = {
  userPoolId: process.env.COGNITO_POOL_ID,
  userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
  region: "us-east-1"
}
