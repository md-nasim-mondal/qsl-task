import { QueryBuilder } from '../../utils/QueryBuilder';
import { IApplication } from './application.interface';
import { Application } from './application.model';

const createApplication = async (payload: IApplication) => {
  const isAlreadyApplied = await Application.findOne({
    job: payload.job,
    user: payload.user,
  });

  if (isAlreadyApplied) {
    throw new Error("You have already applied for this job");
  }

  const result = await Application.create(payload);
  return result;
};

const getAllApplications = async (query: Record<string, string>) => {
  const searchableFields = ['name', 'email', 'cover_note'];
  const applicationQuery = new QueryBuilder(Application.find().populate('job', 'title company'), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await applicationQuery.build();
  const meta = await applicationQuery.getMeta();

  return {
    data,
    meta,
  };
};

const getMyApplications = async (userId: string, query: Record<string, string>) => {
  const searchableFields = ["cover_note"]; // Job title search is handled via populate-based search or just filtering
  
  const applicationQuery = new QueryBuilder(
    Application.find({ user: userId }).populate("job", "title company location"),
    query
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await applicationQuery.build();
  const meta = await applicationQuery.getMeta();

  return {
    data,
    meta,
  };
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
