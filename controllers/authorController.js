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

}

async function updateAuthor(req, res) {

}

export {
    getAllAuthors,
    getAuthor,
    postAuthor,
    deleteAuthor,
    updateAuthor
}
