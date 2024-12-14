const accountRouter = require('./account.route')
const serviceRouter = require('./service.route')
const customerRouter = require('./customer.route')
const garageRouter = require('./garage.route')
const technicianRouter = require('./technician.route')
const appointmentRouter = require('./appointment.route')
const NotificationRouter = require('./notification.route')

module.exports = (app) => {

  app.use('', accountRouter)
  app.use('', serviceRouter)
  app.use('', customerRouter)
  app.use('', garageRouter)
  app.use('', technicianRouter)
  app.use('', appointmentRouter)
  app.use('', NotificationRouter)
}