/**
 * Created by Ori on 4/24/2017.
 */
const moment = require('./node_modules/moment/moment');


 class Logger{

    constructor(name){
        this.name= name;
    }

    /**
     * Write log msg to console, Store it in member log and in Global log
     * @param msg string type
     */
    writeLog(msg){
        let logMsg = `${moment()} # ${this.name} : ${msg}`;
        console.log(logMsg);
    }

}

/**
 * @param name string with the name of the log
 */
module.exports =  function (name) {
    return new Logger(name);
};
