import express from 'express'
import authenticate from '../middlewares/authenticate'
import Status from '../models/Status'

let router = express.Router()

router.post('/', authenticate, (req, res) => {
  const {content} = req.body
  let status = { content }

  Status.create(status)
      .then(status => res.status(201).json({success: true, user: req.currentUser}))
      .catch(err => res.status(500).json({error: err}))
})

export default router