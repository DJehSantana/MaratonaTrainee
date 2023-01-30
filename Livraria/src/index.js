import express from 'express';
import { authorRouter } from '../routes/authorRoutes.js';
import { bookRouter } from '../routes/bookRoutes.js';
import { editorRouter } from '../routes/editorRoutes.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/book', bookRouter);
app.use('/author', authorRouter);
app.use('/editor', editorRouter);

app.use((err, req, res, next) => {
    if (err) {
        console.log(`[ERROR] ${req.url} - method: ${req.method} - ${err.message}`);
        return res.status(err.status || 400).json(`error: ${err.message}`);
    }
});

app.listen(3000, () => {
    console.log('Server running: http://localhost:3000');
});


