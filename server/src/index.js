import express from 'express'
import bodyParser from 'body-parser'

import {initializeDB} from './mongoose'
import users from './routes/users'
import auth from './routes/auth'
import statuses from './routes/statuses'


const port = 8080
const app = express()
initializeDB()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/statuses', statuses)

app.listen(port, () => console.log('Server is running on localhost:' + port))