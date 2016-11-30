import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.dev'

import {initializeDB} from './mongoose'
import users from './routes/users'
import auth from './routes/auth'
import statuses from './routes/statuses'


const port = 3000
const app = express()
initializeDB()
app.use(bodyParser.json())
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/statuses', statuses)

const compiler = webpack(webpackConfig)
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}))
app.use(webpackHotMiddleware(compiler))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(port, () => console.log('Server is running on localhost:' + port))