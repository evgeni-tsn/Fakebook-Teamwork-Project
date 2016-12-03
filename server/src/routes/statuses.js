import express from 'express'
import authenticate from '../middlewares/authenticate'
import Status from '../models/Status'

let router = express.Router()

router.post('/', authenticate, (req, res) => {
  const {content, user} = {content: req.body.content, user: req.currentUser._id}
  let status = { content, user }

  Status.create(status)
        .then(status => res.status(201).json({success: true, user: req.currentUser}))
        .catch(err => res.status(500).json({error: err}))
})

router.get('/', (req, res) => {
  Status.find()
        .sort([['updatedAt', 'descending']])
        .then(s => res.status(200).json(s))
})


router.get('/:user', (req, res) => {
  Status.find({user: req.params.user})
        .sort([['updatedAt', 'descending']])
        .then(s => res.status(200).json(s))
})

export default router