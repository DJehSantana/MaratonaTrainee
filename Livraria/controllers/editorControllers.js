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

}

async function updateEditor(req, res) {

}

export {
    getAllEditors,
    getEditor,
    postEditor,
    deleteEditor,
    updateEditor
}