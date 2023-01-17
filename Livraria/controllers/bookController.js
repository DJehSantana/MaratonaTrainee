import { db } from '../database/dbConfig.js';

async function getAllBooks(req, res) {
    try {
        db.all('select * from book', (err, rows) => {
            res.json(rows)
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

async function getBook(req, res) {
    try {
        const id = req.params.id;
        if (!id || !parseInt(id)) {
            throw new Error('Registro não encontrado');
        }

        db.get('select * from book where id=?', id, (err, rows) => {
            res.json(rows)
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

async function postBook(req, res) {
    try {
        const { title, release_date, id_editor } = req.body;

        if (!title || !release_date || !id_editor) {
            throw new Error('Favor preencher campos obrigatórios');
        }

        const stmt = db.prepare('insert into book (title, release_date, id_editor) values(?, ?, ?)');
        stmt.run(title, release_date, id_editor);
        res.json({ title, release_date, id_editor });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

}

async function deleteBook(req, res) {
    try {
        const id = req.params.id;
        if (!id || !parseInt(id)) {
            throw new Error('Registro não encontrado');
        }

        db.get('delete from book where id=?', id, () => {
            res.json({ message: 'Registro deletado com sucesso!' })
        });

    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

async function updateBook(req, res) {
    try {
        const id = req.params.id;
        const { title, release_date, id_editor } = req.body;

        if (!id || !parseInt(id)) {
            throw new Error('Registro não encontrado');
        }

        if (!title || !release_date || !id_editor) {
            throw new Error('Favor inserir corretamente os dados que deseja atualizar');
        }

        const stmt = db.prepare('update book set title=?, release_date=?, id_editor=? where id=?');
        stmt.run(title, release_date, id_editor, id);
        res.json({ title, release_date, id_editor });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export {
    getAllBooks,
    getBook,
    postBook,
    deleteBook,
    updateBook
}