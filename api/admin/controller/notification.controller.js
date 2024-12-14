const Notification = require('../../../models/notifications.model')
const Customer = require("../../../models/customer.model")
const Garage = require("../../../models/garage.model")
const Appointment = require("../../../models/appointment.model")

module.exports.index = async (req, res) => {
  try {
    // Fetch all notifications using Sequelize
    const notifications = await Notification.findAll();

    console.log("notifications: ", notifications);

    if (notifications.length > 0) {
      // Map notifications to promises, fetching customer data for each
      const notificationPromises = notifications.map(async (notification) => {
        const { customer_id, message, created_at, updated_at } = notification.dataValues;

        console.log("notification: ", notification.dataValues);

        const customer = await Customer.findByPk(customer_id);
        const appointment = await Appointment.findOne({ where: { customer_id: customer_id } });

        let text = "";

        // Check if the appointment exists and has a garage_id
        if (appointment && appointment.garage_id) {
          console.log("appointment.garage_id: ", appointment.garage_id);
          const garage = await Garage.findByPk(appointment.garage_id);
          text = `<b>${customer.full_name}</b> - <b>${customer.phone_number}</b> đặt dịch vụ tại garage: <b>${garage.name}</b>`;
        }

        return {
          id: notification.id,
          customer_id,
          message: text, // Fall back to the original message if `text` is empty
          created_at,
          updated_at,
        };
      });

      // Wait for all promises to resolve
      const notificationsWithMessages = await Promise.all(notificationPromises);

      // Send the response
      res.json({
        code: 200,
        message: "Lấy thông báo thành công!",
        data: notificationsWithMessages,
      });
    } else {
      res.json({
        code: 404,
        message: "Không có thông báo nào!",
      });
    }
  } catch (error) {
    console.error("Error fetching notifications:", error); // Log error for debugging
    res.json({
      code: 500,
      message: "Lỗi server!",
    });
  }
};


module.exports.PostQuickOrder = async (req, res) => {
  try {
    console.log(req.body)
    const notification = new Notification(req.body)
    const data = await notification.save()

    res.json({
      code: 200,
      message: "Tạo thành công!",
      data: data
    })
  } catch (e) {
    res.json({
      code: 400,
      message: "Lỗi!"
    })
  }
}