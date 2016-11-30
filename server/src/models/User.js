import mongoose from 'mongoose'

let requiredValidationMessage = '{PATH} is required'

let userSchema = mongoose.Schema({
  username: { type: String, required: requiredValidationMessage, unique: true },
  email: { type: String, required: requiredValidationMessage, unique: true },
  password_digest: { type: String, required: requiredValidationMessage }
}, {
  timestamps: true
})

export default mongoose.model('User', userSchema)
