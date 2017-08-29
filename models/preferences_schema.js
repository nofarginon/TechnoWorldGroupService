/**
 * Created by Ori on 7/24/2017.
 */
let mongoose = require('mongoose'),
    schema = mongoose.Schema,
    preferencesSchema = new schema({
        regularPreferences : {
            period:[
                {type:String}
            ],
            gener:[
                {type:String}
            ]
        },
        proPregerences : {
            accent:{
                min:{type:Number, required:true},
                max:{type:Number}
            },
            bassdrum:{
                min:{type:Number, required:true},
                max:{type:Number}
            },
            cymbal:{
                min:{type:Number, required:true},
                max:{type:Number, required:true}
            },
            bpm:[
                {type:String}
            ],
            melodie:[
                {type:String}
            ],
            scatter:[
                {type:String}
            ],
            mfx:[
                {type:String}
            ],
        }
    },{collection:'preferences'});

exports.preference = mongoose.model('preferences',preferencesSchema);
