const express = require('express'),
    app = express(),
    Logger = require('./logger'),
    serverLogger = Logger('Server'),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    Songs = require('./controllers/songsController'),
    User =require('./controllers/userController'),
    Comment = require('./controllers/comments_controller');

consts = require('./consts.js');

app.set('port',port);
app.use('/assets', express.static(`${__dirname}/public`));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    (req,res,next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header("Access-Control-Allow-Credentials", true);
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
        next();
    });

/*** All routs***/
app.get('/',function(req,res){
  serverLogger.writeLog(" '/' request");
  res.sendFile(`assets/`);
});

app.get('/getPreferences', Songs.getPreferences);
app.get('/getProPreferences', Songs.getProPreferences);
app.get('/getSongsData', Songs.getData);
app.get('/getPlayListByPreferences',Songs.getPlayListByPreferences);
app.get('/getPlayListByProPreferences',Songs.getPlayListByProPreferences);
app.post('/login',User.login);
app.use('/createPlaylist',Songs.createPlaylist);
app.post('/addComment',Comment.addComment);
app.post('/replayComment',Comment.addReplay);

app.listen(port, () => {
    serverLogger.writeLog(`Server listening on port ${port}`);
});
