const Service = require("../../../models/service.model")
const Appointment = require("../../../models/appointment.model")

module.exports.getALlService = async (req, res) => { 
    const services = await Service.findAll()

    res.json({
        code: 200,
        message: "Lấy toàn bộ services thành công!",
        data: services
      })
}

module.exports.getServiceById = async (req, res) => { 
    const {id} = req.params
    const services = await Service.findByPk(id)

    res.json({
        code: 200,
        message: "Lấy toàn bộ services thành công!",
        data: services
      })
}

module.exports.createService = async (req, res) => {
    try {
        const { name, description, price } = req.body; // Lấy dữ liệu từ request body

        // Kiểm tra các trường bắt buộc
        if (!name || !price) {
            return res.status(400).json({
                code: 400,
                message: "Tên và giá dịch vụ là bắt buộc!",
            });
        }

        // Tạo dịch vụ mới
        const newService = await Service.create({
            name,
            description,
            price,
        });

        // Trả về kết quả
        res.json({
            code: 201,
            message: "Tạo dịch vụ mới thành công!",
            data: newService,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi tạo dịch vụ mới!",
            error: error.message,
        });
    }
};

module.exports.editService = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ URL params
        const { name, description, price } = req.body; // Lấy thông tin từ request body

        // Kiểm tra xem ID có được cung cấp hay không
        if (!id) {
            return res.status(400).json({
                code: 400,
                message: "ID dịch vụ là bắt buộc!",
            });
        }

        // Tìm dịch vụ trong cơ sở dữ liệu
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({
                code: 404,
                message: "Dịch vụ không tồn tại!",
            });
        }

        // Cập nhật thông tin dịch vụ
        if (name !== undefined) service.name = name;
        if (description !== undefined) service.description = description;
        if (price !== undefined) service.price = price;

        // Lưu các thay đổi
        await service.save();

        // Trả về phản hồi thành công
        res.json({
            code: 200,
            message: "Cập nhật dịch vụ thành công!",
            data: service,
        });
    } catch (error) {
        console.error("Error updating service:", error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi cập nhật dịch vụ!",
            error: error.message,
        });
    }
};


module.exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra xem dịch vụ có tồn tại không
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({
                code: 404,
                message: "Dịch vụ không tồn tại!",
            });
        }

        // Xóa tất cả các bản ghi trong appointments có service_id tham chiếu tới dịch vụ này
        await Appointment.destroy({
            where: {
                service_id: id
            }
        });

        // Xóa dịch vụ
        await service.destroy();

        res.json({
            code: 200,
            message: "Xóa dịch vụ và các bản ghi liên quan thành công!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi xóa dịch vụ!",
            error: error.message,
        });
    }
};



