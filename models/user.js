const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
//Define model

//Tell mongoDB what data look like
const userSchema = new Schema({
    email: {type: String,unique: true,lowercase: true},
    password: String

});

//On save hook, encrypt password
//before saving a model, run this function
userSchema.pre('save',function (next) {
    //pull user model to var user
    const user= this;

    //generate salt and run callback
    bcrypt.genSalt(10,function (err,salt) {
        if(err) {return next(err);}

        //hash our password using the salt
        bcrypt.hash(user.password,salt,null,function (err, hash) {
            if(err) {return next(err);}

            // Overwrite password
            user.password = hash;
            next();
        })

    })
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword,this.password,function (err, isMatch) {
      if(err) { return callback(err);}
      callback(null, isMatch);
  });
};

//Create the model class
const ModelClass = mongoose.model('user',userSchema);

//Export model
module.exports = ModelClass;