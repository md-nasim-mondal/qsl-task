import { IJob } from './job.interface';
import { Job } from './job.model';

const createJob = async (payload: IJob) => {
  const result = await Job.create(payload);
  return result;
};

const getAllJobs = async (query: Record<string, unknown>) => {
  const filter: any = {};
  if (query.category) {
    filter.category = query.category;
  }
  if (query.location) {
    filter.location = { $regex: query.location, $options: 'i' };
  }
  if (query.searchTerm) {
    filter.$or = [
      { title: { $regex: query.searchTerm, $options: 'i' } },
      { company: { $regex: query.searchTerm, $options: 'i' } }
    ];
  }

  const result = await Job.find(filter).sort({ createdAt: -1 });
  return result;
};

const getSingleJob = async (id: string) => {
  const result = await Job.findById(id);
  return result;
};

const deleteJob = async (id: string) => {
  const result = await Job.findByIdAndDelete(id);
  return result;
};

export const JobService = {
  createJob,
  getAllJobs,
  getSingleJob,
  deleteJob,
};
