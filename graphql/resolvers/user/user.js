const { UserInputError } = require("apollo-server-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../../models/user/User");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../../utils/validator");

const generateToken = (user) => {
  const { username, email } = user;

  return jwt.sign(
    {
      id: user._id,
      username,
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    register: async (_, args) => {
      let { username, email, password, confirmPassword } = args.registerInput;

      // Validate the user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) throw new UserInputError("Errors", { errors });

      // Check if the username is unique
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("This username is taken");
      }

      // Hash the password
      password = await bcrypt.hash(password, 12);

      // Create the user
      const newUser = await User.create({
        username,
        password,
        email,
        createdAt: new Date().toISOString(),
      });

      // Create the token
      const token = generateToken(newUser);

      return {
        ...newUser._doc,
        id: newUser._id,
        token,
      };
    },
    login: async (_, args) => {
      const { username, password } = args;

      const { valid, errors } = validateLoginInput(username, password);

      if (!valid) throw new UserInputError("Errors", { errors });

      const user = await User.findOne({ username });

      if (!user) throw new Error("The user does not exist");

      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) throw new Error("Invalid credentials");

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
