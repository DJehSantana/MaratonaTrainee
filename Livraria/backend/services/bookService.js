import { db } from '../database/dbConfig.js';

async function getAllBooks(req, res, next) {
    try {
        db.all(`select * from book`, (err, rows) => {
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

        db.get(`select * from book where id=?`, id, (err, rows) => {
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
        const { title, release_date, publisher } = req.body;

        if (!title || !release_date || !publisher) {
            throw new Error('Favor preencher corretamente todos os campos obrigatórios');
        }

        const stmt = db.prepare('insert into book (title, release_date, publisher) values(?, ?, ?)');
        stmt.run(title, release_date, publisher);
        res.status(201).json({ title, release_date, publisher });

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
        const { title, release_date, publisher } = req.body;

        if (!title || !release_date || !publisher) {
            throw new Error('Favor preencher corretamente todos os dados');
        }

        const stmt = db.prepare('update book set title=?, release_date=?, publisher=? where id=?');
        stmt.run(title, release_date, publisher, id);
        res.status(200).json({ id, title, release_date, publisher });
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