import mongoose from 'mongoose'
import hash from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: async email => await User.where({ email }).countDocuments() === 0,
      message: ({ value }) => `Email ${value} has already been taken.`
    }
  },
  username: {
    type: String,
    validate: {
      validator: async username => await User.where({ username }).countDocuments() === 0,
      message: ({ value }) => `Username ${value} has already been taken.`
    }
  },
  name: String,
  password: String
}, {
  timestamps: true
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash.hash(this.password, 10)
  }
})

const User = mongoose.model('User', userSchema)

export default User
