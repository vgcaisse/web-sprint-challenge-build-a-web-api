// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const router = express.Router();

router.get('/', (req, res) => {
    Action.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json('*melee announcer*: Failure!!')
        })
})

router.get('/:id', (req, res) => {
  Action.get(req.params.id)
      .then(action => {
          if(!action) {
            res.status(404).json({ message: `what are you 'doing,' haha get it?` })
          } else {
            res.status(200).json(action)
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json('*melee announcer*: Failure!!')
      })
})

router.delete('/:id', (req, res, next) => {
  Action.remove(req.params.id)
    .then(()=> {
      res.json()
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      CustomMessage: `le monkes are on it!!`,         // epicn gaben helpin outin
      stack: err.stack
    })
  })

module.exports = router;
