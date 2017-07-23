/**
 * Created by Ori on 7/23/2017.
 */
var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    commentsSchema = new schema({
        comment:{type: String, required: true},
        username:{type: String, required: true},
        replays : [
            {comment:{type: String, required: true},
            username:{type: String, required: true}}
            ]
    },{collection:'comments'});

exports.comments = mongoose.model('comments',commentsSchema);

exports.commentsSchema = commentsSchema;