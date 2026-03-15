import { Request, Response } from 'express';
import { JobService } from './job.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

const createJob = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.createJob(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Job created successfully',
    data: result,
  });
});

const getAllJobs = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as Record<string, string>;
  const result = await JobService.getAllJobs(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Jobs fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleJob = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await JobService.getSingleJob(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job fetched successfully',
    data: result,
  });
});

const deleteJob = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await JobService.deleteJob(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job deleted successfully',
    data: result,
  });
});

export const JobController = {
  createJob,
  getAllJobs,
  getSingleJob,
  deleteJob,
};
