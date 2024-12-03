const Admin = require('../../../models/admin.model'); // Đảm bảo bạn đã import mô hình Admin đúng
const md5 = require("md5")

module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!username || !password) {
            return res.status(400).json({
                code: 400,
                message: "Vui lòng nhập đầy đủ username và password!",
            });
        }

        // Tìm Admin theo username
        const user = await Admin.findOne({
            where: { username: username },
        });

        if (!user) {
            return res.status(400).json({
                code: 400,
                message: "Username không tồn tại!",
            });
        }

        // So sánh mật khẩu hash
        if (md5(password) !== user.password_hash) {
            return res.status(400).json({
                code: 400,
                message: "Sai mật khẩu!",
            });
        }

        // Đăng nhập thành công
        const token = user.token; // Lấy token từ DB
        res.cookie("token", token); // Lưu token vào cookie

        res.status(200).json({
            code: 200,
            message: "Đăng nhập thành công!",
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Đã xảy ra lỗi trong quá trình xử lý!",
            error: error.message,
        });
    }
};


module.exports.checkToken = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log(token)

  const user = await Admin.findOne({
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

// module.exports.verifyAccount = async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return res.status(401).json({ message: "Vui lòng gửi kèm token!" });
//     }

//     const token = authHeader.split(" ")[1]; // 'Bearer token_value'

//     const account = await Account.findOne({ token: token, deleted: false }).select("-password");

//     if (!account) {
//       return res.status(401).json({ message: "Token không hợp lệ hoặc tài khoản đã bị xóa!" });
//     }

//     // Tìm role tương ứng của tài khoản
//     const role = await Role.findOne({ _id: account.role_id, deleted: false });

//     res.json({
//       code: 200,
//       message: "Xác nhận tài khoản thành công!",
//       account: {
//         _id: account._id,
//         avatar: account.avatar,
//         email: account.email,
//         role: role ? role.name : null,
//         permissions: role ? role.permissions : null
//       }
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Lỗi hệ thống, vui lòng thử lại sau!" });
//   }
// };