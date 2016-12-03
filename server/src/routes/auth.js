import express from 'express'
import User from '../models/User'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config'

let router = express.Router()

router.post('/', (req, res) => {
  const {identifier, password} = req.body
  User
    .findOne({'username': identifier})
    .then(user => {
        if (user) {
          if (bcryptjs.compareSync(password, user.password_digest)) {
            const token = jwt.sign({
              id: user._id,
              password: user.password_digest
            }, config.jwtSecret)

            res.json({token})
          } else {
            res.status(401).json({form: 'Invalid credentials'})
            console.log("User found but wrong pass")
          }
        } else {
          res.status(401).json({form: 'Invalid credentials'})
          console.log("User not found")
        }
      }
    )
    .catch(e => {
      console.log('Error happen' + e)
    })
})

export default router;