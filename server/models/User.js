import mongoose from 'mongoose'

let requiredValidationMessage = '{PATH} is required'

let userSchema = mongoose.Schema({
  username: { type: String, required: requiredValidationMessage, unique: true },
  email: { type: String, required: requiredValidationMessage, unique: true },
  password_digest: { type: String, required: requiredValidationMessage }
}, {
  timestamps: true
})

// userSchema.method({
//   authenticate: function (password) {
//     let inputHashedPassword = encryption.generateHashedPassword(this.salt, password)
//     if (inputHashedPassword === this.hashedPass) {
//       return true
//     } else {
//       return false
//     }
//   }
// })

export default mongoose.model('User', userSchema)
