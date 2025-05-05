const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
  try {
    console.log('Fetching jobs...');
    const jobs = await Job.find();
    console.log('Jobs found:', jobs.length);
    console.log('First job:', jobs[0]); // Log the first job if exists
    res.json(jobs);
  } catch (err) {
    console.error('Error in getJobs:', err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

exports.createJob = async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).json(job);
};

exports.updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(job);
};

exports.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: 'Job deleted' });
};

exports.getReport = async (req, res) => {
  try {
    console.log('Report query params:', req.query);
    const { fromDate, toDate, company, location, workModel } = req.query;

    const filters = {};
    if (fromDate || toDate) {
      filters.Date = {};
      if (fromDate) filters.Date.$gte = fromDate;
      if (toDate) filters.Date.$lte = toDate;
    }
    if (company) filters.Company = company;
    if (location) filters.Location = location;
    if (workModel) filters["Work Model"] = workModel;

    console.log('Applied filters:', filters);
    const jobs = await Job.find(filters);
    console.log('Found jobs:', jobs.length);

    // Calculate stats
    const total = jobs.length;

    let salarySum = 0;
    let salaryCount = 0;
    jobs.forEach(job => {
      const s = job.Salary;
      if (s && typeof s === 'string' && s.includes('-')) {
        const [min, max] = s.replace(/\$/g, '').split('-').map(v => parseFloat(v));
        if (!isNaN(min) && !isNaN(max)) {
          salarySum += (min + max) / 2;
          salaryCount++;
        }
      }
    });

    const avgSalary = salaryCount > 0 ? `$${(salarySum / salaryCount).toFixed(2)}` : null;

    const workModelCounts = {};
    jobs.forEach(job => {
      const model = job["Work Model"];
      if (model) {
        workModelCounts[model] = (workModelCounts[model] || 0) + 1;
      }
    });

    res.json({
      jobs,
      stats: {
        total,
        avgSalary,
        workModelCounts
      }
    });
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

