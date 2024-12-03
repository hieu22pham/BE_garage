const accountRouter = require('./account.route')
const serviceRouter = require('./service.route')
const customerRouter = require('./customer.route')

module.exports = (app) => {

  app.use('', accountRouter)
  app.use('', serviceRouter)
  app.use('', customerRouter)
}