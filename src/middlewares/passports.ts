//comprobara si lo del token es verdadero

import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import  User  from "../models/user";


//opciones
const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};


export default new Strategy(opts, async (payload, done) => {
   try {
    const user =  await User.findById(payload.id);
    if(user){
        return done(null, user); //null para error con usuario
    }
    return done(null,false); //null para error y con falso para usuario por si no lo encuentra
   } catch (error) {
    console.log(error);
   }
});

