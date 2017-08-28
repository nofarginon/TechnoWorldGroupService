/**
 * Created by Ori on 7/24/2017.
 */
const mongoose = require('mongoose'),
    playlist = require('../models/playlistSchema'),
    Logger = require('../logger'),
    commentsLogger = Logger('comments_contoller');



/**
 * Will push comment into comments property of a playlist
 * @param req.params with the format of :
 *    {
 *      id:String, // The id of the playlist which we want to add the comment to
 *      comment:String, //The comment content
 *      username:String //The username that represent the one who wrote the comment
 *    }
 * @param res : response with
 *              {success:true} // which successful push
 *              {error:'no playlist found with this id'} // error when no playlist with the id
 */
exports.addComment = function (req,res) {
    // let conditions = {_id:req.param('id')}, // Condition will be the id of the playlist which we want to push comment into
    //     update = {$push:{   // Pushing comment with comment:String and username:String
    //         comments :{
    //             comment : req.param('comment'),
    //             username : req.param('username')
    //         }
    //     }},
    //     opts = {multi: true};
    console.log(`id:${req.body.id} comment:${req.body.comment} username:${req.body.username}`);
    let conditions = {_id:req.body.id}, // Condition will be the id of the playlist which we want to push comment into
        update = {$push:{   // Pushing comment with comment:String and username:String
            comments :{
                comment : req.body.comment,
                username : req.body.username
            }
        }},
        opts = {multi: true};

    playlist.update(conditions, update, opts,
        (err)=>{
            if(err) {
                commentsLogger.writeLog(`err: ${err}`);
                res.json({error:'no playlist found with this id'});
            }
            else
                res.json({success:true});
        });
};

/**
 * Will push replay into comment property of a playlist
 * @param req.params with the format of :
 *    {
 *      id:String, // The id of the playlist which we want to add the comment to
 *      comment_id: String // The existing comment that we want to replay to
 *      comment:String, //The comment content
 *      username:String //The username that represent the one who wrote the comment
 *    }
 * @param res : response with
 *              {success:true} // which successful push
 *              {error:'no playlist found with this id of comment with this id'} // error when no playlist with the id
 *                                                                               // of no comment with this comment_id
 */
exports.addReplay =  function (req,res) {
    let conditions = { _id:req.body.id, "comments._id":req.body.comment_id}, // Condition will be the id of the playlist and the id of the comment which we want to replay to
        update = {$push:{   // Pushing replay with comment:String and username:String
            "comments.$.replays" :{
                comment : req.body.comment,
                username : req.body.username
            }
        }},
        opts = {multi: true};

    playlist.update(conditions, update, opts,
        (err)=>{
            if(err) {
                commentsLogger.writeLog(`err: ${err}`);
                res.json({error:'no playlist found with this id of comment with this id'});
            }
            else
                res.json({success:true});

            //DEBUG
            playlist.find({_id:req.body.id},
                (err,list)=>{
                    if(err) commentsLogger.writeLog(`find err: ${err}`);
                    else {
                        commentsLogger.writeLog(`${list}`);
                    }
                });

        });
};