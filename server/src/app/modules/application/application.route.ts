import express from 'express';
import { ApplicationController } from './application.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { ApplicationValidation } from './application.validation';

import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';

const router = express.Router();

router.post(
  '/',
  validateRequest(ApplicationValidation.createApplicationValidationSchema),
  ApplicationController.createApplication
);
router.get('/', ApplicationController.getAllApplications);
router.get('/me', checkAuth(...Object.values(Role)), ApplicationController.getMyApplications);
router.get('/:jobId', ApplicationController.getApplicationsByJob);

export const ApplicationRoutes = router;
