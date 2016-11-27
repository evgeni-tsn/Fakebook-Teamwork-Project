import express from 'express'
import path from 'path'

const port = 3000
const app = express()

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(port, () => console.log('Server is running on localhost:' + port))