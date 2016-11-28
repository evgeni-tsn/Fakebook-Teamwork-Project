import express from 'express'
import validateInput from '../shared/validations/signup'
import bcrypt from 'bcryptjs'
import User from '../models/User'

let router = express.Router()

router.post('/', (req, res) => {
  const {errors, isValid} = validateInput(req.body)

  if (isValid) {
    const {username, email, password} = req.body
    const password_digest = bcrypt.hashSync(password, 10)

    let user = {
      username: username,
      email: email,
      password_digest: password_digest
    }

    User.create(user)
        .then(user => res.json({success: true}))
        .catch(err => res.status(500).json({error: err}))

  } else {
    res.status(400).json(errors)
  }
})

export default router