const Garage = require("../../../models/garage.model")

module.exports.getAllGarages = async (req, res) => {
    try {
        const garages = await Garage.findAll();
        res.status(200).json({
            code: 200,
            message: "Lấy danh sách Garage thành công!",
            data: garages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi lấy danh sách Garage!",
            error: error.message,
        });
    }
};

module.exports.getGarageById = async (req, res) => {
    try {
        const { id } = req.params;

        const garage = await Garage.findByPk(id);
        if (!garage) {
            return res.status(404).json({
                code: 404,
                message: "Garage không tồn tại!",
            });
        }

        res.status(200).json({
            code: 200,
            message: "Lấy thông tin Garage thành công!",
            data: garage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi lấy thông tin Garage!",
            error: error.message,
        });
    }
};

module.exports.createGarage = async (req, res) => {
    try {
        const { name, location, phone_number } = req.body;

        if (!name || !location || !phone_number) {
            return res.status(400).json({
                code: 400,
                message: "Vui lòng nhập đầy đủ thông tin!",
            });
        }

        const newGarage = await Garage.create({
            name,
            location,
            phone_number,
        });

        res.status(201).json({
            code: 201,
            message: "Thêm Garage thành công!",
            data: newGarage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi thêm Garage!",
            error: error.message,
        });
    }
};

module.exports.editGarage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, phone_number } = req.body;

        const garage = await Garage.findByPk(id);
        if (!garage) {
            return res.status(404).json({
                code: 404,
                message: "Garage không tồn tại!",
            });
        }

        await garage.update({
            name: name || garage.name,
            location: location || garage.location,
            phone_number: phone_number || garage.phone_number,
        });

        res.status(200).json({
            code: 200,
            message: "Cập nhật Garage thành công!",
            data: garage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi cập nhật Garage!",
            error: error.message,
        });
    }
};


module.exports.deleteGarage = async (req, res) => {
    try {
        const { id } = req.params;

        const garage = await Garage.findByPk(id);
        if (!garage) {
            return res.status(404).json({
                code: 404,
                message: "Garage không tồn tại!",
            });
        }

        await garage.destroy();

        res.status(200).json({
            code: 200,
            message: "Xóa Garage thành công!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi khi xóa Garage!",
            error: error.message,
        });
    }
};


