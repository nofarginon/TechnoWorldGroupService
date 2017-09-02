const mongoose=require('mongoose');
let user=require('../models/userSchema').User,
    Logger = require('../logger'),
    userLogger = Logger('User_Controller');

/**
 * Adding new User to DB
 * @param req body parameters
 *          name : String
 *          username : String
 *          password : String
 *          email : String
 *          bday : String
 * @param res
 */
exports.login = function (req, res) {
  let newUser=new user({
    name :req.body.name,
    username:req.body.username,
    password: req.body.password,
    email:req.body.email,
    bday:req.body.bday
  });
  newUser.save(
    (err)=>{
      if(err){
          userLogger.writeLog('err:${err}');
          res.json({error:'could not add a new user'});
      }
      else{
          userLogger.writeLog('Success : User Added');
          simpleUserSignIn();
          res.json({success:true});
      }

    });
};

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');

// Create CloudWatch service object
var cw = new AWS.CloudWatch({apiVersion: '2010-08-01'});

// Create parameters JSON for putMetricData
var UserSignInParam = {
        MetricData: [
            {
                MetricName: 'new_user_requests',
                Dimensions: [
                    {
                        Name: 'User_Type',
                        Value: 'Simple_User'
                    },
                ],
                Unit: 'sum',
                Value: 1.0
            },
        ],
        Namespace: 'Site_Requests'
    };


function simpleUserSignIn(){
    cw.putMetricData(UserSignInParam,(err,data)=>{});
}

