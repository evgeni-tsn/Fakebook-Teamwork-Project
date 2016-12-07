import express from 'express'
import authenticate from '../middlewares/authenticate'
import {User, Status, Comment} from '../models/Models'

let router = express.Router()
const perPage = 5

router.post('/create', authenticate, (req, res) => {
    const {content, user} = {content: req.body.content, user: req.currentUser._id}
    let status = {content, user}

    Status.create(status)
        .then(status => {
            User.findByIdAndUpdate(status.user, {$push: {statuses: status._id}})
              .then(() => {
                res.status(201).json({ok: true})
            })
        })
        .catch(err => res.status(500).json({ok: false}))
})

router.post('/:statusId', authenticate, (req, res) => {
    const {content, user, status} = {content: req.body.content, user: req.currentUser._id, status: req.params.statusId}
    let comment = {content, user, status}
    Comment.create(comment)
        .then(comment => {
            Status.findByIdAndUpdate(comment.status, {$push: {comments: comment._id}})
              .then(() => {
                res.status(201).json({ok: true})
              })
        })
        .catch(err => res.status(500).json({ok: false}))
})

router.post('/like/:statusId', authenticate, (req, res) => {
    const {user, statusId} = {user: req.currentUser._id, statusId: req.params.statusId}

    Status.findByIdAndUpdate(statusId, {$addToSet: {likes: user}})
        .then(() => {
            req.status(201).json({ok: true})
        })
        .catch(err => res.status(500).json({ok: false}))
})

router.post('/delete/:statusId', authenticate, (req, res)=> {
    Status.findById({_id: req.params.statusId})
        .then((status) => {
            if(String(status.user) === String(req.currentUser._id)) {
              Status.remove({_id: status._id})
                .then(() => {
                  res.status(200).json({ok: true})
                })
            } else {
              res.status(401).json({error: 'You are not authorized'})
            }
        })
        .catch(err => res.status(500).json({ok: false}))
})

router.post('/:statusId/:commentId', authenticate, (req, res) => {
    const {content, user, status} = {content: req.body.content, user: req.currentUser._id, status: req.params.statusId}
    let comment = {content, user, status}

    Comment.create(comment)
        .then(comment => {
            Status.findByIdAndUpdate(comment.status, {$push: {comments: comment._id}})
                .exec()

            Comment.findByIdAndUpdate(req.params.commentId, {$push: {comments: comment._id}})
                .exec()

            res.status(201).json({success: true, user: req.currentUser})
        })
        .catch(err => res.status(500).json({error: err}))
})

router.get('/:page', (req, res) => {
    Status.find()
      .sort({updatedAt: 'desc'})
      .skip(Number(req.params.page) * perPage)
      .limit(perPage)
      .populate('user', 'username')
      .populate({ path: 'comments', populate: [{ path: 'user', select: 'username'}], options: { sort: { updatedAt: 'asc' }}})
        .then(s => {
          if(s && s.length > 0){
            res.json({statuses: s, finished: false})
          } else {
            res.json({finished: true})
          }
        })
        .catch(err => res.status(500).json({error: err}))
})

router.get('/till/:page', (req, res) => {
  Status.find()
    .sort({updatedAt: 'desc'})
    .skip(0)
    .limit(Number(req.params.page) * perPage)
    .populate('user', 'username')
    .populate({ path: 'comments', populate: [{ path: 'user', select: 'username'}], options: { sort: { updatedAt: 'asc' }}})
    .then(s => {
      if(s && s.length > 0){
        res.json({statuses: s, finished: false})
      } else {
        res.json({finished: true})
      }
    })
    .catch(err => res.status(500).json({error: err}))
})

export default router