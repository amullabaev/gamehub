import { Router } from 'express';
import scoresRoutes from './scores';
import usersRoutes from './users';

const router = Router();

router.use('/scores', scoresRoutes);

router.use('/users', usersRoutes);

export default router;
