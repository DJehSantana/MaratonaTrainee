import express from 'express';
import { getAllEditors, getEditor, postEditor, deleteEditor, updateEditor } from '../services/editorService.js';

const editorRouter = express.Router();

editorRouter.get('/', getAllEditors);
editorRouter.get('/:id', getEditor);
editorRouter.post('/', postEditor);
editorRouter.delete('/:id', deleteEditor);
editorRouter.put('/:id', updateEditor);

export { editorRouter };