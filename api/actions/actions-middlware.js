// add middlewares here related to actions
// err i couldnt find a reason to add middlwares here --> nvm I understand, it was just the same thing as the projects middleware
const Action = require('./actions-model');

const validateID = (req, res, next) => {
    Action.get(req.params.id)
        .then(actions => {
            if (!actions) {
                res.status(404).json({ message: `could not retrieve the actions ${req.params.id}` });
            } else {
                req.actions = actions;
                next();
            }
        })
        .catch(err => console.log(err))
};

const validateBody = (req, res, next) => {
    const { notes, description, project_id } = req.body;

    if (!notes || !description || !project_id) {
        res.status(400).json({ message: 'Some fields are missing you goof' });
    } else {
        next();
    }
};

module.exports = {
    validateID,
    validateBody
};