import express from 'express';
import { getAllEditors, getEditor, postEditor, deleteEditor, updateEditor } from '../controllers/editorControllers.js';

const editorRouter = express.Router();

editorRouter.get('/', getAllEditors);
editorRouter.get('/:id', getEditor);
editorRouter.post('/', postEditor);
editorRouter.delete('/:id', deleteEditor);
editorRouter.patch('/:id', updateEditor);

export { editorRouter };