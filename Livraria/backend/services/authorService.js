import { db } from '../database/dbConfig.js'

async function getAllAuthors(req, res, next) {
    try {
        db.all('select * from author', (err, rows) => {
            if (err) {
                next(err);
            }
            res.status(200).json(rows);
        });
    } catch (error) {
        next(error);
    }
}

async function getAuthor(req, res, next) {
    try {
        const id = req.params.id;
        db.get('select * from author where id=?', id, (err, rows) => {

            if (!rows) {
                res.status(404).json('Registro não encontrado');
            }
            res.status(200).json(rows);
        });

    } catch (error) {
        next(error);
    }
}

async function postAuthor(req, res, next) {
    try {
        const { fullname } = req.body;

        if (!fullname) {
            throw new Error('Favor preencher campos obrigatórios');
        }

        const stmt = db.prepare('insert into author (fullname) values(?)');
        stmt.run(fullname);
        res.status(201).json({ fullname });

    } catch (error) {
        next(error);
    }
}

async function deleteAuthor(req, res, next) {
    try {
        const id = req.params.id;

        db.get('delete from author where id=?', id, () => {
            res.status(204).end();
        });

    } catch (error) {
        next(error);
    }
}

async function updateAuthor(req, res, next) {
    try {
        const id = req.params.id;
        const { fullname } = req.body;

        if (!fullname) {
            throw new Error('Favor inserir corretamente todos os dados');
        }

        const stmt = db.prepare('update author set fullname=? where id=?');
        stmt.run(fullname, id);

        res.status(200).json({ fullname, id });
    } catch (error) {
        next(error);
    }
}

export {
    getAllAuthors,
    getAuthor,
    postAuthor,
    deleteAuthor,
    updateAuthor
}
