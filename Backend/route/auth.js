const auth = require("../controller/auth");
const middlewareController = require("../controller/middleware");
const {
  validateRegisterRequest,
  isRequestValidated,
  validateLoginRequest,
} = require("../validators/auth");

const router = require("express").Router();

//Register
router.post(
  "/register",
  validateRegisterRequest,
  isRequestValidated,
  auth.registerUser
);

//Login
router.post("/login", validateLoginRequest, isRequestValidated, auth.loginUser);

router.get("/admin", middlewareController.verifyTokenAndAdminAuth);

//Refresh
router.post("/refresh", auth.requestRefreshToken);

module.exports = router;
