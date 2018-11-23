import {Router, Request, Response} from 'express';
import MysqlConecction from '../mysql/mysql';

const router = Router();

router.get('/hero', (req: Request, res: Response) => {

    let query = `SELECT * FROM heroes`;

    MysqlConecction.runQuery(query, (err: any, heros: Object[], fields: any) => {
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

router.get('/hero/:id', (req: Request, res: Response) => {

    let id = MysqlConecction.instance.conection.escape(req.params.id);
    let query = `SELECT * FROM heroes WHERE id = ${id}`;

    MysqlConecction.runQuery(query, (err: any, heros: Object[], fields: any) => {
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

export default router;