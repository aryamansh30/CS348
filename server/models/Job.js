const mongoose = require('mongoose');



const jobSchema = new mongoose.Schema({
  Date: { type: String, required: true },
  Apply: { type: String }, // link or CTA text
  "Position Title": { type: String, required: true }, 
  Company: { type: String, required: true },
  "Company Size": { type: String },
  "Company Industry": { type: String },
  Location: { type: String },
  "Work Model": { type: String },
  Salary: { type: String },
  Qualifications: { type: String }
}, {
  collection: 'jobs' // Add this line to ensure it uses the correct collection
});

// Add indexes for reporting and filtering
jobSchema.index({ Date: 1 });               // for fromDate/toDate filtering in report
jobSchema.index({ Company: 1 });            // for company filter in report
jobSchema.index({ Location: 1 });           // for location filter in report
jobSchema.index({ "Work Model": 1 });       // for work model filter and dropdown


module.exports = mongoose.model('Job', jobSchema);
