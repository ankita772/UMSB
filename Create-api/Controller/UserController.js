const UserModel = require("../Model/UserModel");
const generateAuthToken = require("../../config/utility");
//create user
const createUser = async (req, res, next) => {
  try {
    const { username, mobile, email, password } = req.body;
    const userDetails = await UserModel.findOne({ email: email }).exec();
    if (userDetails) {
      res.send("User already exists");
    }
    const user = await new UserModel({ username, mobile, email, password });
    await user.save();
    const token = generateAuthToken(user._id);
    console.log(token);
    res.send({ user: user, token: token });
  } catch (err) {
    next(err);
  }
};

//login user
const loginUser = async (req, res, next) => {
  try {
    console.log("here");
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email }).exec();
    if (!user) {
      res.status(401).send("Invalid email");
    } else if (user.password !== password) {
      res.status(401).send("Invalid password");
    } else {
      const token = generateAuthToken(user._id);
      res.send({ user: user, token: token });
    }
  } catch (err) {
    next(err);
  }
};

//get all users
const getAllUser = async (req, res, next) => {
  try {
    const AllUsers = await UserModel.find({}).exec();
    res.json(AllUsers);
  } catch (err) {
    next(err);
  }
};
//get one user info
const getUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    const User = await UserModel.findById({ _id: id }).exec();
    res.json(User);
  } catch (err) {
    next(err);
  }
};
//update user
const updateUser = async (req, res, next) => {
  try {
    const { id, username, mobile } = req.body;
    const userData = await UserModel.findByIdAndUpdate(
      { _id: id },
      {
        username: username,
        mobile: mobile,
      }
    ).exec();
    userData.username = username;
    userData.mobile = mobile;

    console.log(userData);
    res.send(userData);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await UserModel.findByIdAndDelete({ _id: id }).exec();
    res.send(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
};
