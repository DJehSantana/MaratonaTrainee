import express from 'express';
import cors from 'cors';
import { authorRouter } from '../routes/authorRoutes.js';
import { bookAuthorRouter } from '../routes/bookAuthorRoutes.js';
import { bookRouter } from '../routes/bookRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/book', bookRouter);
app.use('/author', authorRouter);
app.use('/book_author', bookAuthorRouter);

app.use((err, req, res, next) => {
    if (err) {
        console.log(`[ERROR] ${req.url} - method: ${req.method} - ${err.message}`);
        return res.status(err.status || 400).json(`error: ${err.message}`);
    }
});

app.listen(3000, () => {
    console.log('Server running: http://localhost:3000');
});


