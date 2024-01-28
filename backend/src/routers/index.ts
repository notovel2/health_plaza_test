import { Router } from "express";
import todosRouter from './todos';

const router = Router();

router.use('/todos', todosRouter);

export default router;
