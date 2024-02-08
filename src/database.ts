import  mongoose, {ConnectOptions} from 'mongoose';
import config from "./config/config";

/* En esta version de mongoose no se necesita
const dbOptions:ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};*/

mongoose.connect(config.DB.URI, );

const connection = mongoose.connection;

connection.once('open',() => {
    console.log('Conección con MONGODB establecida');
});


connection.once('error',(err) => {
    console.log(err);
    process.exit(0);
});