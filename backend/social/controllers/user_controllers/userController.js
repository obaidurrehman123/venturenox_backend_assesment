const userRepository = require("../../query_repositry/user_repositry/userRepositry");

// creating user
const createUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      department,
      designation,
      image_url,
      tenantid,
      city,
      country,
      bio,
      sociallinks,
    } = req.body;

    if (!firstname) {
      return res
        .status(400)
        .json({ success: false, message: "First name is required" });
    }
    if (!lastname) {
      return res
        .status(400)
        .json({ success: false, message: "Last name is required" });
    }
    const data = {
      first_name: firstname,
      last_name: lastname,
      department: department || null,
      designation: designation || null,
      image_url: image_url || null,
      tenant_id: tenantid || null,
      city: city || null,
      country: country || null,
      bio: bio || null,
      social_links: sociallinks || null,
    };

    const userProfile = await userRepository.createUserProfile(data);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in creating user",
      error,
    });
  }
};

// getting all users

const getAllUsers = async (req, res) => {
  try {
    const getAllUsers = await userRepository.getAllUsersWithTenants();
    res.status(200).json({
      success: true,
      message: "fetched user profiles",
      data: getAllUsers,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in fetching users", error });
  }
};

// getting specific user

const getSpecificeUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userProfile = await userRepository.getUserProfileWithTenant(id);
    if (!userProfile) {
      res.status(404).json({
        success: false,
        message: "no profile exists",
      });
    }
    res.status(200).json({
      success: true,
      message: "fetched user profiles",
      data: userProfile,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in fetching user", error });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const deleteRecord = await userRepository.deleteUserProfileById(
      req.params.id
    );
    if (deleteRecord === 1) {
      return res.status(200).send({
        success: true,
        message: "successfully deleted the record",
      });
    }
    return res.status(404).send({
      success: false,
      message: "no record is deleted",
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in deleting user", error });
  }
};
//update user
const updateUser = async (req, res) => {
  try {
    const user_id = req.params.id;
    const {
      firstname,
      lastname,
      department,
      designation,
      image_url,
      tenantid,
      city,
      country,
      bio,
      sociallinks,
    } = req.body;

    if (!firstname) {
      return res
        .status(400)
        .json({ success: false, message: "First name is required" });
    }
    if (!lastname) {
      return res
        .status(400)
        .json({ success: false, message: "Last name is required" });
    }
    const updatedUser = await userRepository.updateUserProfile(user_id, {
      first_name: firstname,
      last_name: lastname,
      department: department || null,
      designation: designation || null,
      image_url: image_url || null,
      tenant_id: tenantid || null,
      city: city || null,
      country: country || null,
      bio: bio || null,
      social_links: sociallinks || null,
    });
    if (!updatedUser) {
      res.status(403).send({ success: false, message: "not updating record" });
    }
    return res.status(200).send({
      success: true,
      message: "updated record successfully",
      updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in updating user", error });
  }
};

const updateImage = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.file) {
      return res
        .status(404)
        .json({ success: false, message: "No image file provided." });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    const updatedUser = await userRepository.updateUserProfileImage(
      id,
      imageUrl
    );
    if (!updatedUser) {
      res.status(403).send({ success: false, message: "not updating record" });
    }
    return res.status(200).send({
      success: true,
      message: "updated record successfully",
      updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in updating user image", error });
  }
};
module.exports = {
  createUser,
  getAllUsers,
  getSpecificeUser,
  deleteUser,
  updateUser,
  updateImage,
};
