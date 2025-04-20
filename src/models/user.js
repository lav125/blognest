const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const saltfactor = parseInt(process.env.Saltfactor);
const userSchema = new Schema(
  {
    Fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileimageURL: {
      type: String,
      default: "/images/userimage.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(saltfactor, function (err, salt) {
    if (err) return next(err);
    user.salt=salt;

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model("user", userSchema);

module.exports = User;
