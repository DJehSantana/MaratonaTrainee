import { db } from '../database/dbConfig.js';

async function getAllBookAuthors(req, res, next) {
    try {
        db.all(`select ba.id, a.fullname as author_name, b.title, b.release_date from book_author ba 
        inner join author a on a.id=ba.id_author
        inner join book b on b.id=ba.id_book`, (err, rows) => {
            res.status(200).json(rows);
        });

    } catch (error) {
        next(error);
    }
}

async function getBookAuthor(req, res, next) {
    try {
        const id = req.params.id;
        db.get(`select ba.id, a.fullname as author_name, b.title, b.release_date from book_author ba 
        inner join author a on a.id=ba.id_author
        inner join book b on b.id=ba.id_book where ba.id=?`, id, (err, rows) => {
            if (!rows) {
                res.status(404).json('Registro não encontrado');
            }
            res.status(200).json(rows);
        });

    } catch (error) {
        next(error);
    }
}

async function postBookAuthor(req, res, next) {
    try {
        const { id_book, id_author } = req.body;

        if ((!id_book || !parseInt(id_book)) || (!id_author || !parseInt(id_author))) {
            throw new Error('Favor preencher corretamente todos os campos obrigatórios');
        }

        const stmt = db.prepare('insert into book_author (id_book, id_author) values (?,?)');
        stmt.run(parseInt(id_book), parseInt(id_author));
        res.status(201).json({ id_book, id_author });

    } catch (error) {
        next(error);
    }
}

async function deleteBookAuthor(req, res, next) {
    try {
        const id = req.params.id;

        db.get('delete from book_author where id=?', id, () => {
            res.status(204).end();
        });
    } catch (error) {
        next(error);
    }
}

async function updateBookAuthor(req, res, next) {
    try {
        const id = req.params.id;
        const { id_book, id_author } = req.body;

        if ((!id_book || !parseInt(id_book)) || (!id_author || !parseInt(id_author))) {
            throw new Error('Favor preencher corretamente todos os campos obrigatórios');
        }
        parseInt(id_book);
        parseInt(id_author);

        const stmt = db.prepare('update book_author set id_book=?, id_author=? where id=?');
        stmt.run(id_book, id_author, id);
        res.status(200).json({ id_book, id_author, id });

    } catch (error) {
        next(error);
    }
}

export {
    getAllBookAuthors,
    getBookAuthor,
    postBookAuthor,
    deleteBookAuthor,
    updateBookAuthor
}