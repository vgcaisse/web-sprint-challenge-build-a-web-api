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
            res.status(500).json('Failed')
        })
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      CustomMessage: `le monkes are on it!!`,         // epicn gaben helpin outin
      stack: err.stack
    })
  })

module.exports = router;
