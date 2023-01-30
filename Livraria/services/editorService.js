import { db } from '../database/dbConfig.js'

async function getAllEditors(req, res, next) {
    try {
        db.all('select * from editor', (err, rows) => {
            res.status(200).json(rows);
        });
    } catch (error) {
        next(error);
    }
}

async function getEditor(req, res, next) {
    try {
        const id = req.params.id;

        db.get('select * from editor where id=?', id, (err, rows) => {
            if (err) {
                next(err)
            }
            if (!rows) {
                res.status(404).json("Registro não encontrado");
            }
            res.status(200).json(rows);
        });
    } catch (error) {
        next(error);
    }
}

async function postEditor(req, res, next) {
    try {
        const { name } = req.body;

        if (!name) {
            throw new Error('Favor preencher campos obrigatórios');
        }

        const stmt = db.prepare('insert into editor (name) values(?)');
        stmt.run(name);
        res.status(201).json({ name });

    } catch (error) {
        next(error);
    }
}

async function deleteEditor(req, res, next) {
    try {
        const id = req.params.id;

        db.get('delete from editor where id=?', id, () => {
            res.status(204).end();
        });

    } catch (error) {
        next(error);
    }
}

async function updateEditor(req, res) {
    try {
        const id = req.params.id;
        const { name } = req.body;

        if (!name) {
            throw new Error('Favor preencher corretamente todos os campos');
        }

        const stmt = db.prepare('update editor set name=? where id=?');
        stmt.run(name, id);
        res.status(200).json({ id, name });
    } catch (error) {
        next(error);
    }
}

export {
    getAllEditors,
    getEditor,
    postEditor,
    deleteEditor,
    updateEditor
}