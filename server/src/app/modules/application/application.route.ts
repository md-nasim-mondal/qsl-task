import express from 'express';
import { ApplicationController } from './application.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { ApplicationValidation } from './application.validation';

import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';

const router = express.Router();

router.post(
  '/',
  checkAuth(Role.CANDIDATE),
  validateRequest(ApplicationValidation.createApplicationValidationSchema),
  ApplicationController.createApplication
);
router.get('/', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), ApplicationController.getAllApplications);
router.get('/me', checkAuth(...Object.values(Role)), ApplicationController.getMyApplications);
router.get('/:jobId', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), ApplicationController.getApplicationsByJob);

export const ApplicationRoutes = router;
