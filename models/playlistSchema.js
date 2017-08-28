var     mongoose = require (`mongoose`),
        schema = mongoose.Schema,
        song=require('./song_schema').songSchema;
        comment=require('./comments_schema').commentsSchema;
        playlistSchema = new schema({
            PlaylistName:{type: String,required: true},
            Djname: {type: String,required: true},
            Djimg: {type: String},
            country:{type:String,required: true},
            about:{type:String,required: true},
            songs:[song],
            comments:[comment]
    },{collection:`playlist`});

var Playlist = mongoose.model(`playlist`, playlistSchema);

module.exports = Playlist;