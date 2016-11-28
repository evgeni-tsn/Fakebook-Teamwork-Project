import mongoose from 'mongoose'
import User from './models/User'

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

  User.find({}).then(users => {
    if (users.length === 0) {
      User.create({
        username: 'admin',
        email: 'admin@abv.bg',
        password_digest: 'taina'
      })
    }
  })
}