import express from 'express';
import { JobController } from './job.controller';
import { JobValidation } from './job.validation';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(JobValidation.createJobValidationSchema),
  JobController.createJob
);
router.get('/', JobController.getAllJobs);
router.get('/:id', JobController.getSingleJob);
router.delete('/:id', JobController.deleteJob);

export const JobRoutes = router;
