import { Request, Response } from "express";
import { ApplicationService } from "./application.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";

const createApplication = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload | undefined;
  if (!user?.userId) {
    throw new AppError(401, "Not authorized");
  }

  const result = await ApplicationService.createApplication({
    ...req.body,
    user: user.userId,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Application submitted successfully",
    data: result,
  });
});

const getApplicationsByJob = catchAsync(async (req: Request, res: Response) => {
  const jobId = req.params.jobId as string;
  const result = await ApplicationService.getApplicationsByJob(jobId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Applications fetched successfully",
    data: result,
  });
});

const getAllApplications = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as Record<string, string>;
  const result = await ApplicationService.getAllApplications(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All applications fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getMyApplications = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload | undefined;
  const userId = user?.userId;
  if (!userId) {
    throw new AppError(401, "Not authorized");
  }

  const query = req.query as Record<string, string>;
  const result = await ApplicationService.getMyApplications(userId, query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My applications fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

export const ApplicationController = {
  createApplication,
  getAllApplications,
  getMyApplications,
  getApplicationsByJob,
};
