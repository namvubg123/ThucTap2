const { check, validationResult } = require("express-validator");

exports.validateRegisterRequest = [
  check("username").notEmpty().withMessage("Cần nhập tên đăng nhập"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải dài ít nhất 6 kí tự"),
];

exports.validateLoginRequest = [
  check("username").notEmpty().withMessage("Cần nhập tên đăng nhập"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải dài ít nhất 6 kí tự"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ errors: errors.array([0].msg) });
  }
  next();
};
