const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const auth = {
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      console.log(req.body);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        password: hashed,
        lastName: req.body.lastName,
        isAdmin: req.body.isAdmin,
      });

      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Create access token
  createAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1d" }
    );
  },
  //Create refresh token
  createRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "365d" }
    );
  },
  // loginUser: async (req, res) => {
  //   try {
  // const user = await User.findOne({ username: req.body.username });
  // if (!user) {
  //   res.status(404).json("Wrong username");
  // }
  //     const validPassword = bcrypt.compare(req.body.password, user.password);
  //     if (!validPassword) {
  //       res.status(404).json("Wrong password");
  //     }
  //     if (user && validPassword) {
  //       const token = auth.createAccessToken(user);
  //       token.push(token);
  //       //STORE REFRESH TOKEN IN COOKIE
  //       res.cookie("token", token, {
  //         httpOnly: true,
  //         secure: false,
  //         path: "/",
  //         sameSite: "strict",
  //       });
  //       const { password, ...others } = user._doc;
  //       return res.status(200).json({ ...others, accessToken });
  //     }
  //   } catch (err) {
  //     //res.status(500).json(err);
  //   }
  // },

  loginUser: (req, res) => {
    User.findOne({ username: req.body.username }).exec(async (error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
        const validPassword = bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
          res.status(404).json("Wrong password");
        }
        if (validPassword) {
          const token = auth.createAccessToken(user);
          const refreshToken = auth.createRefreshToken(user);
          refreshTokens.push(refreshToken);
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });
          const { password, ...others } = user._doc;
          return res.status(200).json({ ...others, token });
        } else {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    });
  },

  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken = auth.createAccessToken(user);
      const newRefreshToken = auth.createRefreshToken(user);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  },
};

module.exports = auth;
