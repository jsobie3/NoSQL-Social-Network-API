const { Schema, model, Types } = require('mongoose');
const moment = require('moment')


// reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Timestamp via moment
            get: createdTime => moment(createdTime).format("MMM DD, YYYY [at] hh:mm a")
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
)


// thought schema
const ReactionSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            
            get: createdTime => moment(createdTime).format("MMM DD, YYYY [at] hh:mm a")
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})

//create user model

const Thought = model('Thought', ThoughtSchema)

module.export = Thought