import { db } from '../database/dbConfig.js'

async function getAllAuthors(req, res) {
    try {
        db.all('select * from author', (err, rows) => {
            res.json(rows)
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

async function getAuthor(req, res) {
    try {
        const id = req.params.id;
        if (!id || !parseInt(id)) {
            throw new Error('Registro não encontrado');
        }

        db.get('select * from author where id=?', id, (err, rows) => {
            res.json(rows)
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

async function postAuthor(req, res) {
    try {
        const { fullname } = req.body;

        if (!fullname) {
            throw new Error('Favor preencher campos obrigatórios');
        }

        const stmt = db.prepare('insert into author (fullname) values(?)');
        stmt.run(fullname);
        res.json({ fullname });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

}

async function deleteAuthor(req, res) {
    try {
        const id = req.params.id;
        if (!id || !parseInt(id)) {
            throw new Error('Registro não encontrado');
        }

        db.get('delete from author where id=?', id, () => {
            res.json({ message: 'Registro deletado com sucesso!' })
        });

    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

async function updateAuthor(req, res) {
    try {
        const id = req.params.id;
        const { fullname } = req.body;

        if (!id || !parseInt(id)) {
            throw new Error('Registro não encontrado');
        }

        if (!fullname) {
            throw new Error('Favor inserir corretamente os dados que deseja atualizar');
        }

        const stmt = db.prepare('update author set fullname=? where id=?');
        stmt.run(fullname, id);
        res.json({ id, fullname });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export {
    getAllAuthors,
    getAuthor,
    postAuthor,
    deleteAuthor,
    updateAuthor
}
