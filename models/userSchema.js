var     mongoose = require (`mongoose`),
        schema = mongoose.Schema,
        userSchema = new schema({
            name: {type: String,required: true},
            username: {type: String,required: true},
            password: {type: Number,required: true},
            email:{type: String,required: true},
            bday: {type: String,required: true}
    },{collection:`users`});

exports.User = mongoose.model(`user`, userSchema);

exports.userSchema=userSchema;
