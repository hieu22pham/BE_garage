const Appointment = require("../../../models/appointment.model")
const Customer = require("../../../models/customer.model")
const Service = require("../../../models/service.model")
const Garage = require("../../../models/garage.model")

module.exports.createAppointment = async (req, res) => {
    try {
        const { garage_id, service_id, customer_id, appointment_date} = req.body;

        if (!garage_id || !service_id) {
            return res.status(400).json({
                code: 400,
                message: "Vui lòng điền đầy đủ các trường!",
            });
        }

        console.log("appointment_date: ", appointment_date)

        const newAppointment = await Appointment.create({
            garage_id,
            service_id,
            customer_id,
            technician_id: 0,
            appointment_date,
            status: 0,
        });

        res.json({
            code: 201,
            message: "Tạo khách hàng mới thành công!",
            data: newAppointment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi tạo khách hàng!",
            error: error.message,
        });
    }
}

module.exports.getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                code: 400,
                message: "ID cuộc hẹn là bắt buộc!",
            });
        }

        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({
                code: 404,
                message: "Cuộc hẹn không tồn tại!",
            });
        }

        res.json({
            code: 200,
            message: "Lấy thông tin cuộc hẹn thành công!",
            data: appointment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi lấy thông tin cuộc hẹn!",
            error: error.message,
        });
    }
};

module.exports.editAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { garage_id, service_id, customer_id, appointment_date, technician_id, status } = req.body;

        if (!id) {
            return res.status(400).json({
                code: 400,
                message: "ID cuộc hẹn là bắt buộc!",
            });
        }

        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({
                code: 404,
                message: "Cuộc hẹn không tồn tại!",
            });
        }

        // Cập nhật thông tin cuộc hẹn
        if (garage_id !== undefined) appointment.garage_id = garage_id;
        if (service_id !== undefined) appointment.service_id = service_id;
        if (customer_id !== undefined) appointment.customer_id = customer_id;
        if (appointment_date !== undefined) appointment.appointment_date = appointment_date;
        if (technician_id !== undefined) appointment.technician_id = technician_id;
        if (status !== undefined) appointment.status = status;

        await appointment.save();

        res.json({
            code: 200,
            message: "Cập nhật thông tin cuộc hẹn thành công!",
            data: appointment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi cập nhật thông tin cuộc hẹn!",
            error: error.message,
        });
    }
};

module.exports.updateAppointment = async (req, res) => {
    const { id } = req.params; // Lấy ID của lịch hẹn từ URL
    const { 
      customer_name, 
      garage_name, 
      service_name, 
      appointment_date, 
      notes 
    } = req.body; // Lấy dữ liệu từ body
  
    try {
      // Tìm thông tin lịch hẹn theo ID
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ code: 404, message: "Lịch hẹn không tồn tại" });
      }
  
      // Cập nhật thông tin khách hàng
      const customer = await Customer.findByPk(appointment.customer_id);
      if (customer) {
        await customer.update({ full_name: customer_name });
      } else {
        return res.status(404).json({ code: 404, message: "Khách hàng không tồn tại" });
      }
  
      // Cập nhật thông tin garage
      const garage = await Garage.findByPk(appointment.garage_id);
      if (garage) {
        await garage.update({ name: garage_name });
      } else {
        return res.status(404).json({ code: 404, message: "Garage không tồn tại" });
      }
  
      // Cập nhật thông tin dịch vụ
      const service = await Service.findByPk(appointment.service_id);
      if (service) {
        await service.update({ name: service_name });
      } else {
        return res.status(404).json({ code: 404, message: "Dịch vụ không tồn tại" });
      }
  
      // Cập nhật thông tin lịch hẹn
      await appointment.update({
        appointment_date,
        notes,
      });
  
      res.status(200).json({
        code: 200,
        message: "Cập nhật lịch hẹn thành công",
        data: {
          appointment,
          customer,
          garage,
          service,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ code: 500, message: "Lỗi khi cập nhật lịch hẹn" });
    }
  };

module.exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.json({
            code: 200,
            message: "Lấy danh sách cuộc hẹn thành công!",
            data: appointments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi lấy danh sách cuộc hẹn!",
            error: error.message,
        });
    }
};

module.exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                code: 400,
                message: "ID cuộc hẹn là bắt buộc!",
            });
        }

        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({
                code: 404,
                message: "Cuộc hẹn không tồn tại!",
            });
        }

        await appointment.destroy();

        return res.json({
            code: 200,
            message: "Xóa cuộc hẹn thành công!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi xóa cuộc hẹn!",
            error: error.message,
        });
    }
};

