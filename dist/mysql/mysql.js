"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class MysqlConecction {
    constructor() {
        this.conected = false;
        this.conection = mysql_1.default.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'node_db'
        });
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static runQuery(query, callback) {
        this.instance.conection.query(query, (err, results, fields) => {
            if (err) {
                console.log(`Error en la consulta a la base de datos. ${err}`);
                return callback(err);
            }
            if (results.length === 0) {
                callback('No se encontraron registros solicitados!');
            }
            else {
                callback(null, results, fields);
            }
        });
    }
    connectToDb() {
        this.conection.connect((err) => {
            if (err) {
                console.log(`Se produjo un error en la conexion: ${err.message}`);
            }
            this.conected = true;
            console.log(`La base de Datos esta corriendo con exito!`);
        });
    }
    start() {
        this.connectToDb();
    }
    disconect() {
        this.conection.end();
        this.conected = false;
    }
}
exports.default = MysqlConecction;
