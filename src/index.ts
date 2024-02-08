import app from './app' ;
import './database';
app.listen(app.get('port')); //Devolvera el puerte que pasamos en app
console.log(`Servidor en el puerto`, app.get('port'));
