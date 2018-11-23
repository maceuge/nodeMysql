import Server from './server/server';
import router from './routes/routes';
import MysqlConecction from './mysql/mysql';

const server = Server.init(3000);
server.app.use(router);

const mysql = new MysqlConecction();
mysql.start();


server.start(() => {
    console.log(`Servidor Node Express corriendo en el puerto: ${server.port}`);
});