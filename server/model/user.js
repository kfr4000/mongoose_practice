const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name : {
        type: String,
        maxLength: 50,
    },
    email : {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minLength: 5,
    },
    lastname: {
        type: String,
        maxLength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})
 


userSchema.pre("save", function(next){
    //비밀번호를 암호화시킨다
    let user = this;

    if(user.isModified('password')){

        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
})
userSchema.methods.comparePassword = function(plainPassword, cb) {
        //plainPassword 1234567 hashedPassword !@$@TW#@$^$TW$T#$TWEF
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
            cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {
         var user = this;

        // jsonwebtoken을 이용해서 토큰 생성한다
        var token = jwt.sign(user._id.toHexString(), 'secretToken')

         // user._id + 'secretToken' = token

         // ->

         // 'secretToken' -> user._id

         user.token = token
         user.save(function(err, user) {
            if(err) return cb(err);
            cb(null, user);
          })   
    }


userSchema.statics.findByToken = function (token, cb) {
    var user = this;


    user._id + '' == token
    //토큰을 복호화 한다
    jwt.verify(token, "secretToken", function(err, decoded) {
       //유저 아이디를 이용해서 유저를 찾는 다음에 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인 
        user.findOne({"_id" : decoded, "token": token }, function(err, user){
            
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User};