/**
 * Created by Nofar&Ori on 6/15/2017.
 */
const express = require('express'),
    app = express(),
    Logger = require('./logger'),
    serverLogger = Logger('Server'),
    port = process.env.PORT || 3000,
    Songs = require('./controllers/songsController'),
    Comments = require('./controllers/comments_controller');

app.set('port',port);
//app.use('/', express.static('./public'));//for API
app.use('/assets', express.static(`${__dirname}/public`));
app.use(express.static(__dirname + '/public'));

app.use(
    (req,res,next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",``,
            "Origin, X-Requested-With, Content-Type, Accept");
        res.set("Content-Type", "application/json");
        next();
    });

/*** All routs***/
app.get('/',function(req,res){
  serverLogger.writeLog(" '/' request");
  res.sendFile(`assets/`);
});

app.get('/getSongsData', Songs.getData);
app.get('/getPlayListByPreferences',Songs.getPlayListByPreferences);
app.get('/getPlayListByProPreferences',Songs.getPlayListByProPreferences);
app.get('/addComment',Comments.addComment);
app.get('/replayComment',Comments.addReplay);
app.listen(port, () => {
    serverLogger.writeLog(`Server listening on port ${port}`);
});
