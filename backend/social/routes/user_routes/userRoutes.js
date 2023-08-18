const express = require("express");
const upload = require("../../middlewares/multerMiddleware");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getSpecificeUser,
  deleteUser,
  updateUser,
  updateImage,
} = require("../../controllers/user_controllers/userController");

// @desc        create user
// route        localhost:4000/api/v1/user/createuser
// method       post

router.post("/createUser", createUser);

// @desc        get users
// route        localhost:4000/api/v1/user/getusers
// method       get

router.get("/getusers", getAllUsers);

// @desc        get users
// route        localhost:4000/api/v1/user/getuser/id
// method       get

router.get("/getUser/:id", getSpecificeUser);

// @desc        delete user
// route        localhost:4000/api/v1/user/deleteUser/id
// method       delete

router.delete("/deleteUser/:id", deleteUser);

// @desc        update user
// route        localhost:4000/api/v1/user/updateuser/id
// method       patch

router.patch("/updateuser/:id", updateUser);

// @desc        update image
// route        localhost:4000/api/v1/user/updateuser/id
// method       patch

// since there was no requirement for signup and sign so i am updated image and adding url by providing id in params , other i can get
// a user id from token save image url against the user

router.post("/upload/:id", upload.single("image"), updateImage);

module.exports = router;
