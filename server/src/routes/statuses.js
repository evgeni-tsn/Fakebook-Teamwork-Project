import express from 'express'
import authenticate from '../middlewares/authenticate'
import Status from '../models/Status'
import User from '../models/User'
import Comment from '../models/Comment'

let router = express.Router()

router.post('/', authenticate, (req, res) => {
  const {content, user} = {content: req.body.content, user: req.currentUser._id}
  let status = { content, user }

  Status.create(status)
        .then(status => {
          User.findByIdAndUpdate(status.user, { $push: {statuses: status._id }})
            .exec()

          req.currentUser.statuses.add(status)
          res.status(201).json({success: true, user: req.currentUser})
        })
        .catch(err => res.status(500).json({error: err}))
})

router.post('/:statusId', authenticate, (req, res) => {
  const {content, user, status} = {content: req.body.content, user: req.currentUser._id, status: req.params.statusId}
  let comment = { content, user, status }

  Comment.create(comment)
    .then(comment => {
      Status.findByIdAndUpdate(comment.status, { $push: {comments: comment._id}})
        .exec()

      res.status(201).json({success: true, user: req.currentUser})
    })
    .catch(err => res.status(500).json({error: err}))
})

router.post('/like/:statusId', authenticate, (req, res) => {
  const {user, statusId} = {user: req.currentUser._id, statusId: req.params.statusId}

  Status.findByIdAndUpdate(statusId, {$addToSet: {likes: user}})
    .then(status => {
      req.status(201).json({success: true, user: req.currentUser})
    })
    .catch(err => res.status(500).json({error: err}))
})

router.post('/:statusId/:commentId', authenticate, (req, res) => {
  const {content, user, status} = {content: req.body.content, user: req.currentUser._id, status: req.params.statusId}
  let comment = {content, user, status}

  Comment.create(comment)
    .then(comment => {
      Status.findByIdAndUpdate(comment.status, { $push: {comments: comment._id}})
        .exec()

      Comment.findByIdAndUpdate(req.params.commentId, { $push: {comments: comment._id}})
        .exec()

      res.status(201).json({success: true, user: req.currentUser})
    })
    .catch(err => res.status(500).json({error: err}))
})

router.get('/', (req, res) => {
  Status.find()
        .populate('comments')
        .sort({ updatedAt: 'desc' })
        .then(s => res.status(200).json(s))
        .catch(err => res.status(500).json({error: err}))
})

router.get('/:statusId', (req, res) => {
  Status.findById(req.params.statusId)
    .populate('user.username')
    .populate('comments')
    .then(status => {
      res.status(200).json(status)
    })
    .catch(err => res.status(500).json({error: err}))
})

export default router