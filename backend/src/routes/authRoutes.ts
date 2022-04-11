import { Router } from 'express';

const router = Router();

import * as authController from '../controllers/auth';

router.use('/signup', authController.signUp);

export default router;
