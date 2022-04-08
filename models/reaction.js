const { Schema, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: { type: Schema.Types.ObjectId },
        reactionBody: { type: String, required: true, maxlength: 280 },
        username: { type: String, required: true },
        createdAt: { type: String, default: moment().format('MMMM Do YYYY, h:mm:ss a') }
    }
);

module.exports = reactionSchema;