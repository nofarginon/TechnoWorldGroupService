/**
 * Created by Oriamd on 6/14/2017.
 */
const mongoose=require('mongoose'),
     songs=require('../models/song_schema').Song,
     playlist=require('../models/playlistSchema'),
     Logger =require('../logger'),
     songsLogger = Logger('Songs_Controller');

// Defining Preferences data
let genreArray=["minimal","ambient","normal","schranz","hardcore"],
    periodArray=["70's","80's","90's","modern"],
    melodieArray=["monotone","normal","exciting"],
    mfxArray=["min","normal","max"];

let indexGenre,indexPeriod,reqBpm,indexMelodie,reqScatter,
    indexMfx,reqAccent,reqBassdrum,reqCymbal;

//Regular Pref Query
let query={
    songs: {
        $elemMatch: {
            genre: {$in: []},
            period: {$in: []}
        }
    }
};

//Pro pref Query
let pro={
  songs: {
        $elemMatch: {
            bpm: {},
            melodie: {$in: []},
            scatter:{$in:[]},
            mfx:{$in:[]},
            accent:{$in:[]},
            bassdrums:{$in:[]},
            cymbal:{$in:[]}
        }
    }
  };

/**
 * return as response json of all songs in db
 * @param req
 * @param res : response with
 *             on Success Array of Songs Data
 *             on Error {error:"No Songs Data"};
 *
 */
exports.getData = function (req, res) {
  songs.find({},
  (err,docs)=>{
      if(err){
          songsLogger.writeLog(`error:${err}`);
          res.JSON({error:"No Songs Data"})
      }

      console.log(docs);
      res.json(docs);
  });
};

/**
 * return as response json of Playlist matching Regular Preferences params
 * @param req Query string with params :
 *          genre : string
 *          period : String
 * @param res
 *        on Success : return Array of Playlists matching Preferences
 *        on Error :
 *            When no matching playlists found {"error": "There is no playlist by these Preferences"}
 *            Other Error {error:"request error"}
 */
exports.getPlayListByPreferences = function (req, res) {
    songsLogger.writeLog('getPlayListByPreferences Request In')
    query.songs.$elemMatch.genre.$in=[];
    query.songs.$elemMatch.period.$in=[];

  //Setting find Range in Genre
  indexGenre = genreArray.indexOf(req.param('genre'));
  if(indexGenre===0)
      query.songs.$elemMatch.genre.$in.push(genreArray[indexGenre],genreArray[indexGenre+1]);
  else if(indexGenre+1===genreArray.length)
      query.songs.$elemMatch.genre.$in.push(genreArray[indexGenre],genreArray[indexGenre-1]);
  else
      query.songs.$elemMatch.genre.$in.push(genreArray[indexGenre-1],genreArray[indexGenre],genreArray[indexGenre+1]);

  //Setting find Range in Genre
  indexPeriod = periodArray.indexOf(req.param('period'));
  if(req.param('period')==='all')
      query.songs.$elemMatch.period.$in.push({});
  else{
    if(indexPeriod===0)
        query.songs.$elemMatch.period.$in.push(periodArray[indexPeriod],periodArray[indexPeriod+1]);
    else if(indexPeriod+1===periodArray.length)
        query.songs.$elemMatch.period.$in.push(periodArray[indexPeriod],periodArray[indexPeriod-1]);
    else
        query.songs.$elemMatch.period.$in.push(periodArray[indexPeriod-1],periodArray[indexPeriod],periodArray[indexPeriod+1]);
  }

  playlist.find(query,
  (err,docs)=>{
      if(err) {
          songsLogger.writeLog('Error : ' + err);
          res.json({error:'request error'})
      }
      if(docs.length===0) {
          songsLogger.writeLog('Error : There is no playlist by these Preferences');
          res.json({error: "There is no playlist by these Preferences"});
      }
      else {
          songsLogger.writeLog("Success Sending playlist to client");
          res.json(docs);
      }
  });
};

/**
 * return as response json of Playlist matching Pro Preferences params
 * @param req Query string with params :
 *          bpm: Number
 *          melodie: String
 *          scatter: Number
 *          mfx: String
 *          accent: Number
 *          bassdrums: Number
 *          cymbal: Number
 * @param res
 *        on Success : return Array of Playlists matching Preferences
 *        on Error :
 *            When no matching playlists found {"error": "There is no playlist by these Preferences"}
 *            Other Error {error:"request error"}
 */
exports.getPlayListByProPreferences = function (req, res) {
  pro.songs.$elemMatch.bpm={};
  pro.songs.$elemMatch.melodie.$in=[];
  pro.songs.$elemMatch.scatter.$in=[];
  pro.songs.$elemMatch.mfx.$in=[];
  pro.songs.$elemMatch.accent.$in=[];
  pro.songs.$elemMatch.bassdrums.$in=[];
  pro.songs.$elemMatch.cymbal.$in=[];

  //Setting find Range in BPM
    reqBpm=parseInt(req.param('bpm'));
  if(reqBpm===120)
      pro.songs.$elemMatch.bpm={'$gt':100,'$lt':160};
  else if(reqBpm===200)
      pro.songs.$elemMatch.bpm={'$gt':100,'$lt':200};
  else
      pro.songs.$elemMatch.bpm={'$gt':reqBpm-20,'$lt':reqBpm+20};

  //Setting find Range in Melodie
    indexMelodie=melodieArray.indexOf(req.param('melodie'));
  if(indexMelodie+1===melodieArray.length)
      pro.songs.$elemMatch.melodie.$in.push(melodieArray[indexMelodie-1],melodieArray[indexMelodie]);
  else
      pro.songs.$elemMatch.melodie.$in.push(melodieArray[indexMelodie-1],melodieArray[indexMelodie],melodieArray[indexMelodie+1]);

  //Setting find Range in Scatter
  reqScatter=parseInt(req.param('scatter'));
  if(reqScatter>5)
      pro.songs.$elemMatch.scatter.$in.push(7,10) ;
  else
      pro.songs.$elemMatch.scatter.$in.push(1,3,5);

  //Setting find Range in MFX
  indexMfx=mfxArray.indexOf(req.param('mfx'));
  if(indexMfx+1===mfxArray.length)
      pro.songs.$elemMatch.mfx.$in.push(mfxArray[indexMfx-1],mfxArray[indexMfx]);
  else
      pro.songs.$elemMatch.mfx.$in.push(mfxArray[indexMfx],mfxArray[indexMfx+1]);

  reqAccent=parseInt(req.param('accent'));
  if(reqAccent===5) pro.songs.$elemMatch.accent.$in.push(3,5);
  else pro.songs.$elemMatch.accent.$in.push(1,3);

  reqBassdrum=parseInt(req.param('bassdrums'));
  if(reqBassdrum===5) pro.songs.$elemMatch.bassdrums.$in.push(3,5);
  else pro.songs.$elemMatch.bassdrums.$in.push(1,3);

  //Setting find Range in cymbal
  reqCymbal=parseInt(req.param('cymbal'));
  if(reqCymbal===5)
      pro.songs.$elemMatch.cymbal.$in.push(3,5);
  else
      pro.songs.$elemMatch.cymbal.$in.push(1,3);

  console.log(JSON.stringify(pro));
  playlist.find(pro,
  (err,docs)=>{
      if(err) {
          songsLogger.writeLog('Error : ' + err);
          res.json({error:'request error'})
      }
      if(docs.length===0) {
          songsLogger.writeLog('Error : There is no playlist by these Preferences');
          res.json({error: "There is no playlist by these Preferences"});
      }
      else {
          songsLogger.writeLog("Success Sending playlist to client");
          res.json(docs);
      }
  });
};

/**
 * Set new playlist
 * @param req param as JSON
 *      {
 *          PlaylistName: String
 *          Djname : String
 *          Djimg: String
 *          country: String
 *          about: String
 *          songs: [String] //songs id
 *      }
 * @param res
 */
exports.createPlaylist = function (req, res) {
    songsLogger("createPlatlist Req In");
    songs.find({"id":{$in:req.body.songs}},(err,newsongs)=>{
      if(err){
        songsLogger.writeLog(`Error :${err}`);
        res.json({error:'cannot get songs'});
      }
      else if(newsongs.length==0){
          songsLogger.writeLog(`Error : No`);
          res.json({error:'no songs found matching songs ids'});
      }
      else{
          newPlaylist(req,res,newsongs);
      }

    });
  
};

/***
 * Adding new playlist with given array of songs data
 * @param req
 * @param res
 * @param newsongs Array of songs from DB
 */
function newPlaylist(req, res,newsongs){
  let newPlaylist=new playlist({
      PlaylistName:req.body.PlaylistName,
      Djname :req.body.Djname,
      Djimg:'unknown',
      country:req.body.country,
      about:req.body.about,
      songs:newsongs
  });
  newPlaylist.save(
    (err)=>{
      if(err){
        songsLogger.writeLog(`err:${err}`);
        res.json({error:"Cannot add playlist"})
      }
      else{
          songsLogger.writeLog("Success : playlist Added");
          res.json({success:true});
      }
    });
}