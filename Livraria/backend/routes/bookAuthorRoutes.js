import express from 'express';
import { getAllBookAuthors, getBookAuthor, postBookAuthor, deleteBookAuthor, updateBookAuthor } from '../services/bookAuthorService.js'

const bookAuthorRouter = express.Router();

bookAuthorRouter.get('/', getAllBookAuthors);
bookAuthorRouter.get('/:id', getBookAuthor);
bookAuthorRouter.post('/', postBookAuthor);
bookAuthorRouter.delete('/:id', deleteBookAuthor);
bookAuthorRouter.put('/:id', updateBookAuthor);

export { bookAuthorRouter };