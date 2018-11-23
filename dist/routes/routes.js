"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/hero', (req, res) => {
    let query = `SELECT * FROM heroes`;
    mysql_1.default.runQuery(query, (err, heros, fields) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.json({
            ok: true,
            message: 'Hasta aqui llegamos bien',
            heros: heros,
            fields: fields
        });
    });
});
router.get('/hero/:id', (req, res) => {
    let id = mysql_1.default.instance.conection.escape(req.params.id);
    let query = `SELECT * FROM heroes WHERE id = ${id}`;
    mysql_1.default.runQuery(query, (err, heros, fields) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.json({
            ok: true,
            id: id,
            message: 'Lista de Heroe buscado',
            heros: heros[0]
        });
    });
});
exports.default = router;
