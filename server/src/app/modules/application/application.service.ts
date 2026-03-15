import { IApplication } from './application.interface';
import { Application } from './application.model';

const createApplication = async (payload: IApplication) => {
  const result = await Application.create(payload);
  return result;
};

const getAllApplications = async () => {
  const result = await Application.find().sort({ createdAt: -1 }).populate('job', 'title company');
  return result;
};

const getMyApplications = async (userId: string) => {
  const result = await Application.find({ user: userId }).sort({ createdAt: -1 }).populate('job', 'title company');
  return result;
};

const getApplicationsByJob = async (jobId: string) => {
  const result = await Application.find({ job: jobId }).sort({ createdAt: -1 });
  return result;
};

export const ApplicationService = {
  createApplication,
  getAllApplications,
  getMyApplications,
  getApplicationsByJob,
};
