const Customer = require("../../../models/customer.model")
const Appointment = require("../../../models/appointment.model")

module.exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json({
            code: 200,
            message: "Lấy danh sách khách hàng thành công!",
            data: customers,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi lấy danh sách khách hàng!",
            error: error.message,
        });
    }
};

module.exports.createCustomer = async (req, res) => {
    try {
        const { full_name, email, phone_number, address } = req.body;

        if (!full_name || !email || !phone_number) {
            return res.status(400).json({
                code: 400,
                message: "Tên, email và số điện thoại là bắt buộc!",
            });
        }

        const newCustomer = await Customer.create({
            full_name,
            email,
            phone_number,
            address,
        });

        res.json({
            code: 201,
            message: "Tạo khách hàng mới thành công!",
            data: newCustomer,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi tạo khách hàng!",
            error: error.message,
        });
    }
};

module.exports.updateCustomer = async (req, res) => {
    const { id } = req.params; // Lấy ID từ URL
    const { full_name } = req.body; // Lấy dữ liệu từ body
  
    try {
      // Kiểm tra sự tồn tại của khách hàng
      const customer = await Customer.findByPk(id);
      if (!customer) {
        return res.status(404).json({ code: 404, message: "Khách hàng không tồn tại" });
      }
  
      // Cập nhật thông tin
      await customer.update({ full_name });
  
      res.status(200).json({ code: 200, message: "Cập nhật khách hàng thành công", data: customer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ code: 500, message: "Lỗi khi cập nhật khách hàng" });
    }
  };

module.exports.getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                code: 400,
                message: "ID khách hàng là bắt buộc!",
            });
        }
        //find by primary key
        const customer = await Customer.findByPk(id);
        // const customer = await Customer.findOne({id: id});

        if (!customer) {
            return res.status(404).json({
                code: 404,
                message: "Khách hàng không tồn tại!",
            });
        }

        res.json({
            code: 200,
            message: "Lấy thông tin khách hàng thành công!",
            data: customer,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi lấy thông tin khách hàng!",
            error: error.message,
        });
    }
};

module.exports.editCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email, phone_number, address } = req.body;

        if (!id) {
            return res.status(400).json({
                code: 400,
                message: "ID khách hàng là bắt buộc!",
            });
        }

        const customer = await Customer.findByPk(id);

        if (!customer) {
            return res.status(404).json({
                code: 404,
                message: "Khách hàng không tồn tại!",
            });
        }

        // Cập nhật thông tin khách hàng
        if (full_name !== undefined) customer.full_name = full_name;
        if (email !== undefined) customer.email = email;
        if (phone_number !== undefined) customer.phone_number = phone_number;
        if (address !== undefined) customer.address = address;

        await customer.save();

        res.json({
            code: 200,
            message: "Cập nhật thông tin khách hàng thành công!",
            data: customer,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi cập nhật thông tin khách hàng!",
            error: error.message,
        });
    }
};

module.exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra xem ID có được truyền vào không
        if (!id) {
            return res.status(400).json({
                code: 400,
                message: "ID khách hàng là bắt buộc!",
            });
        }

        // Kiểm tra xem khách hàng có tồn tại không
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({
                code: 404,
                message: "Khách hàng không tồn tại!",
            });
        }

        // Cập nhật các bản ghi trong bảng appointments, gán customer_id = NULL
        await Appointment.update(
            { customer_id: 0 },  // Hoặc gán một giá trị mặc định
            { where: { customer_id: id } }
        );

        // Hoặc nếu muốn xóa các bản ghi trong bảng appointments:
        // await Appointment.destroy({
        //     where: { customer_id: id }
        // });

        // Sau khi xử lý xong các bản ghi liên quan, xóa khách hàng
        await customer.destroy();

        res.json({
            code: 200,
            message: "Xóa khách hàng và các bản ghi liên quan thành công!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi xóa khách hàng!",
            error: error.message,
        });
    }
};

