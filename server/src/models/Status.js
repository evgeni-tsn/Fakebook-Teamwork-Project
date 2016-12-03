import mongoose from 'mongoose'

let requiredValidationMessage = '{PATH} is required'

let statusSchema = mongoose.Schema({
  content: {type: String, required: requiredValidationMessage},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: requiredValidationMessage},
  lmt: {type: Date, default: (function () {
    return new Date()
  }())
  },
  likes: {type: Number, default: 0},
  comments: [{type: mongoose.Schema.ObjectId, ref: 'Comment'}]
}, {
  timestamps: true
})

export default mongoose.model('Status', statusSchema)