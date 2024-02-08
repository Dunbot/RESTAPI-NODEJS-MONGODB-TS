//Aqui solo configuraremos el servidor

import express from 'express';
import { Request, Response } from 'express';
import morgan from 'morgan';
import cors from "cors";
import passport from "passport";
import passportMiddleware from "./middlewares/passports";

//Importacion de rutas
import authRoutes from './routes/auth.routes';
import privateRoutes from './routes/private.routes';

//Inicializaciones
const app = express();



//Configuraciones
app.set('port',process.env.PORT || 3000);



//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);


//Rutas
app.get('/', (req:Request ,res:Response) => { // Siempre va primero req y de ahi res
    res.send(`La api esta en http://localhost:${app.get('port')}`);
});


app.use(authRoutes);
app.use(privateRoutes);

//Exportacion
export default app;