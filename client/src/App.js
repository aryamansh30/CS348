import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobsManager from './components/JobsManager';
import EditJob from './components/EditJob';
import JobReports from './components/JobReports'; // ✅ NEW IMPORT

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobsManager />} />
        <Route path="/edit/:id" element={<EditJob />} />
        <Route path="/reports" element={<JobReports />} /> {/* ✅ NEW ROUTE */}
      </Routes>
    </Router>
  );
}

export default App;
