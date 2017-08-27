var     mongoose = require (`mongoose`),
        schema = mongoose.Schema,
        song=require('./song_schema').songSchema;
        playlistSchema = new schema({
            Djname: {type: String,required: true},
            Djimg: {type: String},
            country:{type:String,required: true},
            about:{type:String,required: true},
            songs:[song]
    },{collection:`playlist`});

var Playlist = mongoose.model(`playlist`, playlistSchema);

module.exports = Playlist;