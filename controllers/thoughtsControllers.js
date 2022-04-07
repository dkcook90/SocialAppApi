const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');
const thought = require('../models/thought');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => {
            return res.json(thoughts);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    // get a single thought by id
    getSingleThought(req,res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'No thought found with this ID'})
            : res.json({thought}))
    },

    // post new thought (push new thoughts id to the associated user's thoughts array)
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    // put update a thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought found with this ID'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },

    // delete a thought by id
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought found with this ID'})
            : res.json({ message: 'Thought successfully deleted!'})
        )
        .catch((err) => res.status(500).json(err))
    }
}