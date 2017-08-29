var     mongoose = require (`mongoose`),
        schema = mongoose.Schema,
        preferences = new schema({
            genre:[String],
            period:[String]
    },{collection:`preferences`});
        proPreferences = new schema({
        melodie:[String],
        mfx:[String],
        bpm:[Number]
    },{collection:`proPreferences`});

exports.preferences=mongoose.model(`preferences`, preferences);;
exports.proPreferences=mongoose.model('proPreferences',proPreferences);