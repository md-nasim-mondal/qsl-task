import express from 'express';
import { JobController } from './job.controller';
import { JobValidation } from './job.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';

const router = express.Router();

router.post(
  '/',
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(JobValidation.createJobValidationSchema),
  JobController.createJob
);
router.get('/', JobController.getAllJobs);
router.get('/:id', JobController.getSingleJob);
router.delete('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), JobController.deleteJob);

export const JobRoutes = router;
