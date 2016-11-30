import mongoose from 'mongoose'

let requiredValidationMessage = '{PATH} is required'

let statusSchema = mongoose.Schema({
  content: {type: String, required: requiredValidationMessage}
}, {
  timestamps: true
})

export default mongoose.model('Status', statusSchema)