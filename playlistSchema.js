var     mongoose = require (`mongoose`),
        schema = mongoose.Schema,
        song=require('./song_schema.js');
        playlistSchema = new schema({
            Djname: {type: String,required: true},
            songs:[song]
    },{collection:`playlist`});

var Playlist = mongoose.model(`playlist`, playlistSchema);

module.exports = Playlist;
