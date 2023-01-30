import { db } from '../database/dbConfig.js';

async function getAllBooks(req, res, next) {
    try {
        db.all(`select b.id, b.title, b.release_date, e.name as name_editor from book b
        inner join editor e on e.id=b.id_editor`, (err, rows) => {
            if (err) {
                next(err);
            }
            res.status(200).json(rows);
        });
    } catch (error) {
        next(error);
    }
}

async function getBook(req, res, next) {
    try {
        const id = req.params.id;

        db.get(`select b.id, b.title, b.release_date, e.name as name_editor from book b
        inner join editor e on e.id=b.id_editor where b.id=?`, id, (err, rows) => {
            if (err) {
                next(err);
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

async function postBook(req, res, next) {
    try {
        const { title, release_date, id_editor } = req.body;

        if (!title || !release_date || !id_editor || !parseInt(id_editor)) {
            throw new Error('Favor preencher corretamente todos os campos obrigatórios');
        }

        const stmt = db.prepare('insert into book (title, release_date, id_editor) values(?, ?, ?)');
        stmt.run(title, release_date, id_editor);
        res.status(201).json({ title, release_date, id_editor });

    } catch (error) {
        next(error);
    }

}

async function deleteBook(req, res, next) {
    try {
        const id = req.params.id;

        db.get('delete from book where id=?', id, () => {
            res.status(204).end();
        });

    } catch (error) {
        next(error);
    }
}

async function updateBook(req, res, next) {
    try {
        const id = req.params.id;
        const { title, release_date, id_editor } = req.body;

        if (!title || !release_date || !id_editor || !parseInt(id_editor)) {
            throw new Error('Favor preencher corretamente todos os dados');
        }

        const stmt = db.prepare('update book set title=?, release_date=?, id_editor=? where id=?');
        stmt.run(title, release_date, id_editor, id);
        res.status(200).json({ id, title, release_date, id_editor });
    } catch (error) {
        next(error);
    }
}

export {
    getAllBooks,
    getBook,
    postBook,
    deleteBook,
    updateBook
}