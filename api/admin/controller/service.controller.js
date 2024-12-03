const Service = require("../../../models/service.model")

module.exports.getALlService = async (req, res) => { 
    const services = await Service.findAll()

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

