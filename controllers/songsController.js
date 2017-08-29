const mongoose=require('mongoose')
 var songs=require('../models/song_schema').Song,
     playlist=require('../models/playlistSchema'),
     playlistbuild=require('../models/playlistSchema'),
     preferences=require('../models/preferencesSchema').preferences,
     propreferences=require('../models/preferencesSchema').proPreferences,
     genreArray,periodArray,melodieArray,mfxArray;

getPreferenceslocal((err,data)=>{
  if(err){
    if(err)console.log('query error');
  }
  else{
    genreArray=data[0].genre;
    periodArray=data[0].period;
  }
});//["minimal","ambient","normal","schranz","hardcore"],["70's","80's","90's","modern"],

getProPreferenceslocal((err,data)=>{
  if(err){
    if(err)console.log('query error');
  }
  else{
    melodieArray=data[0].melodie;
    mfxArray=data[0].mfx;
  }
});//melodieArray=["monotone","normal","exciting"],mfxArray=["min","normal","max"];


var indexGenre,indexPeriod,reqBpm,indexMelodie,reqScatter,
    indexMfx,reqAccent,reqBassdrum,reqCymbal;


var query={
    songs: {
        $elemMatch: {
            genre: {$in: []},
            period: {$in: []}
        }
    }
}

var pro={
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
/*
 * return as response json of all songs in db
 * @param req
 * @param res
 */
exports.getData = function (req, res) {
  songs.find({},
  (err,docs)=>{
      if(err)console.log('query error');
      console.log(docs);
      res.json(docs);
  });
};

exports.getPreferences = function (req, res) {
  getPreferenceslocal((err,docs)=>{
      if(err)console.log('query error');
      console.log(docs);
      res.json(docs);
  });
};
function getPreferenceslocal(callback){
  preferences.find({},callback);
}

exports.getProPreferences = function (req, res) {
  getProPreferenceslocal((err,docs)=>{
      if(err)console.log('query error');
      console.log(docs);
      res.json(docs);
  });
};

function getProPreferenceslocal(callback){
  propreferences.find({},callback);
}
/**
 * return as response json of Playlist matching Preferences params
 * @param req
 * @param res
 */
exports.getPlayListByPreferences = function (req, res) {
  query.songs.$elemMatch.genre.$in=[];
  query.songs.$elemMatch.period.$in=[];
  indexGenre = genreArray.indexOf(req.param('genre'));
  if(indexGenre===0) query.songs.$elemMatch.genre.$in.push(genreArray[indexGenre],genreArray[indexGenre+1]);
  else if(indexGenre+1===genreArray.length) query.songs.$elemMatch.genre.$in.push(genreArray[indexGenre],genreArray[indexGenre-1]);
  else query.songs.$elemMatch.genre.$in.push(genreArray[indexGenre-1],genreArray[indexGenre],genreArray[indexGenre+1]);

  indexPeriod = periodArray.indexOf(req.param('period'));
  if(req.param('period')==='all') query.songs.$elemMatch.period.$in.push({});
  else{
    if(indexPeriod===0) query.songs.$elemMatch.period.$in.push(periodArray[indexPeriod],periodArray[indexPeriod+1]);
    else if(indexPeriod+1===periodArray.length) query.songs.$elemMatch.period.$in.push(periodArray[indexPeriod],periodArray[indexPeriod-1]);
    else query.songs.$elemMatch.period.$in.push(periodArray[indexPeriod-1],periodArray[indexPeriod],periodArray[indexPeriod+1]);
  }
  console.log(JSON.stringify(query));

  playlist.find(query,
  (err,docs)=>{
      if(err)console.log('query error');
      console.log(docs);
      if(docs.length===0) res.json({"error": "There is no playlist by these Preferences"});
      else res.json(docs);
  });
};

/**
 * return as response json of Playlist matching Pro Preferences params
 * @param req
 * @param res
 */
exports.getPlayListByProPreferences = function (req, res) {
  pro.songs.$elemMatch.bpm={};
  pro.songs.$elemMatch.melodie.$in=[];
  pro.songs.$elemMatch.scatter.$in=[];
  pro.songs.$elemMatch.mfx.$in=[];
  pro.songs.$elemMatch.accent.$in=[];
  pro.songs.$elemMatch.bassdrums.$in=[];
  pro.songs.$elemMatch.cymbal.$in=[];
  reqBpm=parseInt(req.param('bpm'));
  if(reqBpm===120)pro.songs.$elemMatch.bpm={'$gt':100,'$lt':160};
  else if(reqBpm===200) pro.songs.$elemMatch.bpm={'$gt':100,'$lt':200};
  else pro.songs.$elemMatch.bpm={'$gt':reqBpm-20,'$lt':reqBpm+20};

  indexMelodie=melodieArray.indexOf(req.param('melodie'));
  if(indexMelodie+1===melodieArray.length) pro.songs.$elemMatch.melodie.$in.push(melodieArray[indexMelodie-1],melodieArray[indexMelodie]);
  else pro.songs.$elemMatch.melodie.$in.push(melodieArray[indexMelodie-1],melodieArray[indexMelodie],melodieArray[indexMelodie+1]);

  reqScatter=parseInt(req.param('scatter'));
  if(reqScatter>5) pro.songs.$elemMatch.scatter.$in.push(7,10) ;
  else pro.songs.$elemMatch.scatter.$in.push(1,3,5);

  indexMfx=mfxArray.indexOf(req.param('mfx'));
  if(indexMfx+1===mfxArray.length) pro.songs.$elemMatch.mfx.$in.push(mfxArray[indexMfx-1],mfxArray[indexMfx]);
  else pro.songs.$elemMatch.mfx.$in.push(mfxArray[indexMfx],mfxArray[indexMfx+1]);

  reqAccent=parseInt(req.param('accent'));
  if(reqAccent===5) pro.songs.$elemMatch.accent.$in.push(3,5);
  else pro.songs.$elemMatch.accent.$in.push(1,3);

  reqBassdrum=parseInt(req.param('bassdrums'));
  if(reqBassdrum===5) pro.songs.$elemMatch.bassdrums.$in.push(3,5);
  else pro.songs.$elemMatch.bassdrums.$in.push(1,3);

  reqCymbal=parseInt(req.param('cymbal'));
  if(reqCymbal===5) pro.songs.$elemMatch.cymbal.$in.push(3,5);
  else pro.songs.$elemMatch.cymbal.$in.push(1,3);

  console.log(JSON.stringify(pro));
  playlist.find(pro,
  (err,docs)=>{
      if(err)console.log('query error');
      console.log(docs);
      if(!docs || docs.length===0) res.json({"error": "There is no playlist by these ProPreferences"});
      else res.json(docs);
  });
};


exports.createPlaylist = function (req, res) {
    // var newsongs=songs.find({_id:{$in:req.body.songs.map(function(id){return mongoose.Types.ObjectId(id);})}});
    songs.find({"id":{$in:req.body.songs}},(err,newsongs)=>{
      if(err){
        console.log(`err:${err}`);
        res.json({error:'couldnot add a new playlist'});
        //res.json(newsongs);
      }
      else{
            console.log(newsongs);
        newPlaylist(req,res,newsongs);
      }

    });
  
}

function newPlaylist(req, res,newsongs){
  var newPlaylist=new playlistbuild({
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
        console.log(`err:${err}`);
        //res.json(newsongs);
      }
      else{
        console.log('saved playlist');
        res.json({success:true});
      }

    });
}