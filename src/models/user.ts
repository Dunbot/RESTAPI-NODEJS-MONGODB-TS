import mongoose from 'mongoose';
import {model, Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt';



//Interfaz para el autocompletar
export interface IUser extends Document{
    email:string,
    password: string;
    comparePassword(password: string): Promise<boolean>;
    
}



const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type: String,
        required: true
    }
})

//Funcion para cifrar la contraseña
//Hacemos e5 para no perder el alcance
userSchema.pre<IUser>('save',async function (next){
    const user = this; //para mejor comprension del alcance
    if(!user.isModified('password')) return next(); //si el usuario es nuevo o no modifica la contraseña continuara con el codigo de abajo

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password,salt);
    user.password = hash;
    next();
} );

//Funcion para verificar que la contraseña ingresada sea la que esta en la DB
userSchema.methods.comparePassword = async function (password:string): Promise <boolean>{

    return await bcrypt.compare(password,this.password );

};


export default model<IUser>('User',userSchema);