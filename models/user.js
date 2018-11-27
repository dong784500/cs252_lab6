const mongoose = require('mongoose')
const validator = require('validator')
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'Not a valid email address'
      },
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    } 
  },
  {
    versionKey: false,
    timestamps: true
  }
)

UserSchema.methods.comparePassword = function(passwordAttempt, cb) {
    if (passwordAttempt == this.password) {
        cb(null, true)
    } else {
        cb(new Error('invalid password'))
    }
}

UserSchema.index({
  email: 'text',
  username: 'text',
  role: 'text',
})
module.exports = mongoose.model('User', UserSchema)
