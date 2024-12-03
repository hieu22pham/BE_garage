const express = require('express')
const router = express.Router();

const controller = require("../controllers/account.controller")

router.post("/login", controller.login)
router.post("/checkToken", controller.checkToken)

module.exports.login = async(req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await Account.findOne({
        email: email,
        deleted: false
    })

    if (!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại!",
        })

        return;
    }
    if (md5(password) !== user.password) {
        res.json({
            code: 400,
            message: "Sai mật khẩu!",
        })
        return;
    }

    const token = user.token
    res.cookie("token", token)

    res.json({
        code: 200,
        message: "Đăng nhập thành công!",
        token: token
    })
}

module.exports.checkToken = async(req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token)

    const user = await Account.findOne({
        deleted: false,
        token: token
    })

    if (user) {
        res.json({
            code: 200,
            message: "Tồn tại token!",
        })
    } else {
        res.json({
            code: 400,
            message: "Token sai!",
        })
    }
}

module.exports.verifyAccount = async(req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Vui lòng gửi kèm token!" });
        }

        const token = authHeader.split(" ")[1]; // 'Bearer token_value'

        const account = await Account.findOne({ token: token, deleted: false }).select("-password");

        if (!account) {
            return res.status(401).json({ message: "Token không hợp lệ hoặc tài khoản đã bị xóa!" });
        }

        // Tìm role tương ứng của tài khoản
        const role = await Role.findOne({ _id: account.role_id, deleted: false });

        res.json({
            code: 200,
            message: "Xác nhận tài khoản thành công!",
            account: {
                _id: account._id,
                avatar: account.avatar,
                email: account.email,
                role: role ? role.name : null,
                permissions: role ? role.permissions : null
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi hệ thống, vui lòng thử lại sau!" });
    }
};