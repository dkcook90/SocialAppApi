const moment = require('moment');
const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
        createdAt: { type: String, default: moment().format('MMMM Do YYYY, h:mm:ss a')},
        username: { type: String, required: true },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return `Reactions to this thought: ${this.reactions.length}`
    });

const thought = model('thought', thoughtSchema);

module.exports = thought;