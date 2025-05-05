const Sample = require('../models/Sample');

const getSample = async (req, res) => {
  const sample = await Sample.findOne();
  res.json({ message: sample?.message || 'Default Mongo message' });
};

module.exports = { getSample };
