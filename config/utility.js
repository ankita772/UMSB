const jwt = require("jsonwebtoken");
const generateAuthToken = (payload) => {
  try {
    const token = jwt.sign(
      { _id: payload._id.toString() },
      process.env.SECRET_KEY
    );
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = generateAuthToken;
