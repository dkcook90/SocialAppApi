const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getUsers(req,res) {
        User.find().populate('thoughts').populate('friends')
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
        User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends')
        .then(async (user) => 
        !user ? res.status(404).json({ message: 'No user found with this ID'}) 
        : res.json({user}))
    },

    // post a new user
    createUser(req, res) {
        User.create(req.body)
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
        User.findOneAndRemove({ _id: req.params.userId })
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user found with this ID'})
            : res.json({ message: 'User successfully deleted!' })
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // post a friend to a user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { "friends": req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'Cannot add Friend, no user was found with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },

    // delete a friend from a user's friend list
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $pull: { "friends": req.params.friendId }}
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'Cannot remove Friend, no user was found with that ID'})
            : res.json({ message: 'Friend successfully removed!'})
        )
        .catch((err) => res.status(500).json(err))
    }
}