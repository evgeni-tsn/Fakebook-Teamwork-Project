import mongoose from 'mongoose'
import { User } from './models/Models'
import bcrypt from 'bcryptjs'

export function initializeDB() {
  mongoose.Promise = global.Promise
  const database = 'mongodb://localhost:27017/fakebook'
  mongoose.connect(database)

  let db = mongoose.connection

  db.once('open', err => {
    if (err) {
      console.log(err)
    }

    console.log('MongoDB ready!')
  })

  db.on('error', err => console.log('Database error: ' + err))

  User.count().then(count => {
    if (count === 0) {
      User.create({
        username: 'admin',
        email: 'admin@abv.bg',
        password_digest: bcrypt.hashSync('admin', 10),
        followers: [],
        following: [],
        statuses: []
      })
    }
  })
}