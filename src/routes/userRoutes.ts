import { Router } from 'express';

import * as userController from '../controllers/userController';

const router = Router();

router.post('/signin', userController.signin);
router.post('/signup', userController.signup);

export default router;
