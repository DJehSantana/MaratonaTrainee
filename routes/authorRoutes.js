import express from 'express';
import { getAllAuthors, getAuthor, postAuthor, deleteAuthor, updateAuthor } from '../controllers/authorController.js';

const authorRouter = express.Router();

authorRouter.get('/', getAllAuthors);
authorRouter.get('/:id', getAuthor);
authorRouter.post('/', postAuthor);
authorRouter.delete('/:id', deleteAuthor);
authorRouter.patch('/:id', updateAuthor);

export { authorRouter };