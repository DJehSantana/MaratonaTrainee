import express from 'express';
import { getAllBooks, getBook, postBook, deleteBook, updateBook } from '../services/bookService.js';

const bookRouter = express.Router();

bookRouter.get('/', getAllBooks);
bookRouter.get('/:id', getBook);
bookRouter.post('/', postBook);
bookRouter.delete('/:id', deleteBook);
bookRouter.put('/:id', updateBook);

export { bookRouter };