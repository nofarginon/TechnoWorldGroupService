const mongoose=require('mongoose');
var playlist=require('../models/playlistSchema');

exports.getData=function(req,res){
    playlist.find({},
    (err,docs)=>{
        if(err)console.log('query error');
        console.log(docs);
        res.json(docs);
        return;
    });
}
