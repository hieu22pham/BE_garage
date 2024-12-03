const Technician = require("../../../models/technician.model")

module.exports.getAllTechnicians = async (req, res) => {
    try {
        const technicians = await Technician.findAll();
        res.status(200).json({
            code: 200,
            message: "Lấy danh sách Technicians thành công!",
            data: technicians,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi lấy danh sách Technicians!",
            error: error.message,
        });
    }
};

module.exports.getTechnicianById = async (req, res) => {
    try {
        const { id } = req.params;

        const technician = await Technician.findByPk(id);
        if (!technician) {
            return res.status(404).json({
                code: 404,
                message: "Technician không tồn tại!",
            });
        }

        res.status(200).json({
            code: 200,
            message: "Lấy thông tin Technician thành công!",
            data: technician,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi lấy thông tin Technician!",
            error: error.message,
        });
    }
};

module.exports.createTechnician = async (req, res) => {
    try {
        const { full_name, email, phone_number, specialty } = req.body;

        if (!full_name || !email || !phone_number) {
            return res.status(400).json({
                code: 400,
                message: "Vui lòng nhập đầy đủ thông tin!",
            });
        }

        const newTechnician = await Technician.create({
            full_name,
            email,
            phone_number,
            specialty,
        });

        res.status(201).json({
            code: 201,
            message: "Thêm Technician thành công!",
            data: newTechnician,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi thêm Technician!",
            error: error.message,
        });
    }
};

module.exports.editTechnician = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email, phone_number, specialty } = req.body;

        const technician = await Technician.findByPk(id);
        if (!technician) {
            return res.status(404).json({
                code: 404,
                message: "Technician không tồn tại!",
            });
        }

        await technician.update({
            full_name: full_name || technician.full_name,
            email: email || technician.email,
            phone_number: phone_number || technician.phone_number,
            specialty: specialty || technician.specialty,
        });

        res.status(200).json({
            code: 200,
            message: "Cập nhật Technician thành công!",
            data: technician,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi cập nhật Technician!",
            error: error.message,
        });
    }
};

module.exports.deleteTechnician = async (req, res) => {
    try {
        const { id } = req.params;

        const technician = await Technician.findByPk(id);
        if (!technician) {
            return res.status(404).json({
                code: 404,
                message: "Technician không tồn tại!",
            });
        }

        await technician.destroy();

        res.status(200).json({
            code: 200,
            message: "Xóa Technician thành công!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi xóa Technician!",
            error: error.message,
        });
    }
};

