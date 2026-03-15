import { QueryBuilder } from "../../utils/QueryBuilder";
import { IJob } from "./job.interface";
import { Job } from "./job.model";

const createJob = async (payload: IJob) => {
  const result = await Job.create(payload);
  return result;
};

const getAllJobs = async (query: Record<string, string>) => {
  const searchableField = ["title", "company", "category", "location"];
  const jobQuery = new QueryBuilder(Job.find(), query)
    .search(searchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await jobQuery.build();
  const meta = await jobQuery.getMeta();

  return {
    data,
    meta,
  };
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
