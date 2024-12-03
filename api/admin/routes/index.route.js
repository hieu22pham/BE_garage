const accountRouter = require('./account.route')
const serviceRouter = require('./service.route')
const customerRouter = require('./customer.route')

module.exports = (app) => {
  const version = "/api/admin"

  app.use(version + '/accounts', accountRouter)
  app.use(version + '/services', serviceRouter)
  app.use(version + '/customers', customerRouter)
}