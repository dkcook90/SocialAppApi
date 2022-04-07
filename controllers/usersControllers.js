const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
    // get all users
    getUsers(req,res) {
        User.find()
        .then(async (users) => {
            return res.json(users);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    // get a single user by thier id AND populated thought and friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.UserId })
        .then(async (user) => 
        !user ? res.status(404).json({ message: 'No user found with this ID'}) 
        : res.json({user}))
    },

    // post a new user
    createUser(req, res) {
        User.creaet(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // put update a user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user found with this ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // delete a user by id
    deleteUser(req, res) {
        User.findOneandRemove({ _id: req.params.userId })
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user found with this ID'})
            : res.json({ message: 'User successfully deleted!' })
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
}