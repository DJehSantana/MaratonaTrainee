import express from 'express';
import { getAllBooks, getBook, postBook, deleteBook, updateBook } from '../controllers/bookController.js';

const bookRouter = express.Router();

bookRouter.get('/', getAllBooks);
bookRouter.get('/:id', getBook);
bookRouter.post('/', postBook);
bookRouter.delete('/:id', deleteBook);
bookRouter.patch('/:id', updateBook);

export { bookRouter };