var     mongoose = require (`mongoose`),
        schema = mongoose.Schema,
        song=require('./song_schema').songSchema,
        comments = require('./comments_schema').commentsSchema;
        playlistSchema = new schema({
            Djname: {type: String,required: true},
            songs:[song],
            comments: [comments]
    },{collection:`playlist`});

var Playlist = mongoose.model(`playlist`, playlistSchema);

module.exports = Playlist;