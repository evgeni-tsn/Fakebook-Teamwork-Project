import express from 'express'
import commonValidations from '../shared/validations/signup'
import bcrypt from 'bcryptjs'
import User from '../models/User'
import isEmpty from 'lodash/isEmpty'

let router = express.Router()

function validateInput(data, otherValidations) {

  let {errors} = otherValidations(data);

  return User.find({$or: [{username: data.username}, {email: data.email}]})
             .then(user => {
               if (user.length) {
                 if (user[0].username === data.username) {
                   errors.username = 'Username is used';
                 }
                 if (user[0].email === data.email) {
                   errors.email = 'Email is used';
                 }
               }
               return {
                 errors,
                 isValid: isEmpty(errors)
               }
             })
}

router.get('/:identifier', (req, res) => {

  User.find({$or: [{username: req.params.identifier}, {email: req.params.identifier}]}).select('username email')
      .then(user => {
        res.json({user})
      })

})

router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({errors, isValid}) => {
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
})

export default router