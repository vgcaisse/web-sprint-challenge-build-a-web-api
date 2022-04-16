// Write your "actions" router here!
const router = require('express').Router();
const Action = require('./actions-model');

const { validateID, validateBody } = require('./actions-middlware');

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

router.get('/:id', validateID, (req, res) => {
  Action.get(req.params.id)
    .then(action => {
      if (!action) {
        res.status(404).json(action)
      } else {
        res.status(200).json(action)
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json('*melee announcer*: Failure!!')
    })
})

router.post('/', validateBody, (req, res, next) => {
  Action.insert(req.body)
    .then(actions => {
      res.status(201).json(actions)
    })
    .catch(next)
})

router.put('/:id', validateID, validateBody, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then(actions => {
      res.json(actions);
    })
    .catch(next)
});

router.delete('/:id', (req, res, next) => {
  Action.remove(req.params.id)
    .then(() => {
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
