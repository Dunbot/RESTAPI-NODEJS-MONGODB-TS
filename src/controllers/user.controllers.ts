import {Request, Response} from 'express';
import User,{IUser} from '../models/user';
import jwt from "jsonwebtoken";
import config from '../config/config';
//funcion de token
function createToken(user: IUser){
    return jwt.sign({id: user.id, email: user.email},config.jwtSecret,{
        expiresIn: 86400
    }); //genera el token con los datos que se ingresan

}

export const signUp = async (req:Request, res:Response): Promise<Response> =>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            message:'Por favor Ingrese Correo y Contraseña'
        })
    }

    const user = await User.findOne({email:req.body.email});
    console.log(user);
    if (user){
        return res.status(400).json({
            message: "El usuario ya existe"
        });
    }
    const newuser = new User(req.body);
    await newuser.save();
    return res.status(201).json(newuser);
};

export const signIn = async (req:Request, res:Response) : Promise<Response>=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            message:'Por favor Ingrese Correo y Contraseña'
        })
    }

    const user = await User.findOne({email:req.body.email});
    if (!user){
        return res.status(400).json({
            message: 'El usuario no existe'
        })
    }
    const isMatch = await user.comparePassword(req.body.password);

    if(isMatch){
        return res.status(200).json({token: createToken(user) })
    }
    


    return res.status(400).json({
        message: 'El correo o contraseña son incorrectos'
    });
}
