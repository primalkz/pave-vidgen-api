const jobService = require('../services/jobService');

const createJob = async (req, res, next) => {
  try {
    const job = await jobService.createJob(req.body);
    console.log(`Job created: ${job.id}`);
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (!job) return res.status(404).json({ success: false, error: 'Job not found' });
    res.json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

const listJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    next(error);
  }
};

const updateJobStatus = async (req, res, next) => {
  try {
    const job = await jobService.updateJobStatus(req.params.id, req.body.status);
    if (!job) return res.status(404).json({ success: false, error: 'Job not found' });
    console.log(`Job ${req.params.id} status updated to: ${req.body.status}`);
    res.json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

module.exports = { createJob, getJobById, listJobs, updateJobStatus };
