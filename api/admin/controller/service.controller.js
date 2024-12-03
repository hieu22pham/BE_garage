const Service = require("../../../models/service.model")

module.exports.getALlService = async (req, res) => { 
    const services = await Service.findAll()

    res.json({
        code: 200,
        message: "Lấy toàn bộ services thành công!",
        data: services
      })
}
