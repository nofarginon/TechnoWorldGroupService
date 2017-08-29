let mongoose = require (`mongoose`),
    schema = mongoose.Schema,
    songSchema = new schema({
        id: {type: Number, index: 1, required: true,unique:true},
        name: {type: String,required: true},
        artist: {type: String,required: true},
        genre: {type: String,required: true},
        period:{type: String,required: true},
        bpm: {type: Number,required: true},
        accent: {type: Number,required: true},
        bassdrums: {type: Number,required: true},
        cymbal: {type: Number,required: true},
        melodie: {type: String,required: true},
        scatter: {type: Number,required: true},
        mfx: {type: String,required: true},
        likes: {type: Number,required: true},
        url: {type: String}
    },{collection:`techno_songs`});

exports.Song = mongoose.model(`song`, songSchema);

exports.songSchema=songSchema;
