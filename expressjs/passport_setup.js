let LocalStrategy = require('passport-local').Strategy;
const { isEmpty } = require('lodash');
let myUser = require('./controllers/index')
let bcrypt = require('bcryptjs')

const validPassword = function(user,password){
    return bcrypt.compareSync(password,user.password);
}

module.exports = function(passport){
    passport.serializeUser(function(user,done){
        done(null,user.id)
    });
    passport.deserializeUser(async function(id,done){
        await myUser.findUserbyId(id).then(user => {
            if (user == null){
                done(new Error('Wrong user id'))
            }
            done(null,user[0][0]);
        })
    });
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    async function(req,username,password,done){
        return await myUser.findUserbyUsername(username).then((result) => {
            if(isEmpty(result[0])){
                    return done(null, false, { message: 'Incorrect credentials.' })
                }
            let user = result[0][0]
            if (user == null){
                return done(null, false, { message: 'Incorrect credentials.' })
            }else if (user.password == null || user.password == undefined){
                return done(null, false, { message: 'You must reset your password' })
            } else if (!validPassword(user,password)) {
                return done(null, false, { message: 'Incorrect credentials.' }) 
            }
            return done(null,user);
        }).catch(err => {
            done(err,false);
        })
    }))
}