const express = require('express');
const router = express.Router();
const {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getReport
} = require('../controllers/jobController');

router.get('/report', getReport);
router.get('/', getJobs);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;