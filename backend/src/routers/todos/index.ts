import { Router } from "express";
import { createController, getController, removeController, updateController } from "../../controller/todos";

const router = Router();

router.get('/', getController);
router.post('/', createController);
router.patch('/:id', updateController);
router.delete('/:id', removeController);

export default router;
