import { db } from '../database/dbConfig.js'

async function getAllEditors(req, res) {
    try {
        db.all('select * from editor', (err, rows) => {
            res.json(rows)
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

async function getEditor(req, res) {
    try {
        const id = req.params.id;
        if (!id || !parseInt(id)) {
            throw new Error('Registro não encontrado');
        }

        db.get('select * from editor where id=?', id, (err, rows) => {
            res.json(rows)
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

async function postEditor(req, res) {
    try {
        const { name, id_book } = req.body;

        if (!name || !id_book) {
            throw new Error('Favor preencher campos obrigatórios');
        }

        const stmt = db.prepare('insert into editor (name, id_book) values(?, ?)');
        stmt.run(name, id_book);
        res.json({ name, id_book });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

}

async function deleteEditor(req, res) {
    try {
        const id = req.params.id;
        if (!id || !parseInt(id)) {
            throw new Error('Registro não encontrado');
        }

        db.get('delete from editor where id=?', id, () => {
            res.json({ message: 'Registro deletado com sucesso!' })
        });

    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

async function updateEditor(req, res) {
    try {
        const id = req.params.id;
        const { name } = req.body;

        if (!id || !parseInt(id)) {
            throw new Error('Registro não encontrado');
        }
        if (!name) {
            throw new Error('Favor inserir corretamente os dados que deseja atualizar');
        }

        const stmt = db.prepare('update editor set name=? where id=?');
        stmt.run(name, id);
        res.json({ id, name });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export {
    getAllEditors,
    getEditor,
    postEditor,
    deleteEditor,
    updateEditor
}