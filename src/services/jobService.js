const jobs = new Map();

const createJob = (data) => {
  const now = new Date();
  const job = {
    id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    productImageUrl: data.productImageUrl,
    template: data.template,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };
  jobs.set(job.id, job);
  return { ...job };
};

const getJobById = (id) => {
  const job = jobs.get(id);
  return job ? { ...job } : undefined;
};

const getAllJobs = () => {
  return Array.from(jobs.values()).sort((a, b) => b.createdAt - a.createdAt);
};

const updateJobStatus = (id, status) => {
  const job = jobs.get(id);
  if (!job) return undefined;
  const updated = { ...job, status, updatedAt: new Date() };
  jobs.set(id, updated);
  return { ...updated };
};

module.exports = { createJob, getJobById, getAllJobs, updateJobStatus, _jobs: jobs };
