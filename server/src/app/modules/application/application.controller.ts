import { Request, Response } from 'express';
import { ApplicationService } from './application.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

const createApplication = catchAsync(async (req: Request, res: Response) => {
  const result = await ApplicationService.createApplication(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Application submitted successfully',
    data: result,
  });
});

const getApplicationsByJob = catchAsync(async (req: Request, res: Response) => {
  const jobId = req.params.jobId as string;
  const result = await ApplicationService.getApplicationsByJob(jobId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Applications fetched successfully',
    data: result,
  });
});

export const ApplicationController = {
  createApplication,
  getApplicationsByJob,
};
