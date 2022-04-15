// Write your "projects" router here!
const router = require('express').Router();
const Project = require('./projects-model');

const { validateID, validateBody } = require('./projects-middleware');

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(next)
});





module.exports = router;
