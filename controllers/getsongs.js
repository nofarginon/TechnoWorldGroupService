const mongoose=require('mongoose');
var songs=require('../models/song_schema').Song;

exports.getData=function(req,res){
    songs.find({},
    (err,docs)=>{
        if(err)console.log('query error');
        console.log(docs);
        res.json(docs);
    });
}
