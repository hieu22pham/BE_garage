const accountRouter = require('./account.route')

module.exports = (app) => {
  const version = "/api/admin"

  app.use(version + '/accounts', accountRouter)
}