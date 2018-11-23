import mysql from 'mysql';

export default class MysqlConecction {
    
    // Patron singleton
    private static _instance: MysqlConecction;

    public conection: mysql.Connection;
            conected: boolean = false;

    constructor () {
        this.conection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '123456',
            database : 'node_db'
        });
    }

    public static get instance () {
        return this._instance || ( this._instance = new this() );
    }

    public static runQuery (query: string, callback: Function) {
        this.instance.conection.query(query, (err, results: Object[], fields) => {
            if (err) {
                console.log(`Error en la consulta a la base de datos. ${err}`);
                return callback(err);
            }

            if (results.length === 0) {
                callback('No se encontraron registros solicitados!');
            } else {
                callback(null, results, fields);
            }
        });
    }

    private connectToDb () {
        this.conection.connect( (err: mysql.MysqlError) => {
            if (err) {
                console.log(`Se produjo un error en la conexion: ${err.message}`);
            }
            this.conected = true;
            console.log(`La base de Datos esta corriendo con exito!`);
        });
    }

    public start () {
        this.connectToDb();
    }

    public disconect () {
        this.conection.end();
        this.conected = false;
    }


}