import express from 'express';
import clickerController from './controller';

const router = express.Router();

router.get('/', clickerController.getAllScores);

router.get('/:id', clickerController.getScoresById);

router.post('/save', clickerController.saveScore);

router.delete('/:id', clickerController.deleteScore);

export default router;