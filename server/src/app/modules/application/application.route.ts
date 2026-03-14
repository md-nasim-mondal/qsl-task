import express from 'express';
import { ApplicationController } from './application.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { ApplicationValidation } from './application.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ApplicationValidation.createApplicationValidationSchema),
  ApplicationController.createApplication
);
router.get('/:jobId', ApplicationController.getApplicationsByJob);

export const ApplicationRoutes = router;
