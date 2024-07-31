import passport from 'passport';
import { Prisma, PrismaClient } from '@prisma/client'
import { Strategy as LocalStrategy } from 'passport-local';
import passportJWT from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;;
const ExtractJWT = passportJWT.ExtractJwt;

const prisma = new PrismaClient()
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async function (username, password, done) {
        try {
            const user = await prisma.user.findFirst(
                { where: { email: username,
                    password: password
                 } },
            );
            if (!user) {
                return done(null, false, { message: "Incorrect email or password" });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    (jwtPayload, cb) => {
        console.log(jwtPayload);
        return prisma.user.findFirst({ where: { id: jwtPayload.id } })
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));