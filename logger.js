/**
 * Created by Ori on 4/24/2017.
 */
const moment = require('./node_modules/moment/moment');
var fs = require('fs');

 class Logger{
 
    constructor(name){
        this.name= name;
        this.logFile = '/var/log/messages';
    }

    /**
     * Write log msg to console, Store it in member log and in Global log
     * @param msg string type
     */
    writeLog(msg){
        let logMsg = `${moment()} # ${this.name} : ${msg}`;
        console.log(logMsg);
        fs.appendFile(this.logFile,`# ${this.name} : ${msg}\n`,()=>{});

    }

}

/**
 * @param name string with the name of the log
 */
module.exports =  function (name) {
    return new Logger(name);
};
