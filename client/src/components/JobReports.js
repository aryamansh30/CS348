import React, { useEffect, useState } from 'react';

// Replace the API_URL constant with the direct URL for now
const API_URL = 'https://cs348-458507.uc.r.appspot.com';

const JobReports = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    company: '',
    location: '',
    workModel: ''
  });
  const [companies, setCompanies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [workModels, setWorkModels] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching jobs...');
      const res = await fetch(`${API_URL}/api/jobs`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Fetched jobs:', data);
      setJobs(data);

      const unique = (key) => [...new Set(data.map(job => job[key]).filter(Boolean))];
      setCompanies(unique('Company'));
      setLocations(unique('Location'));
      setWorkModels(unique('Work Model'));
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const generateReport = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Generating report with filters:', filters);
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`${API_URL}/api/jobs/report?${query}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Report data:', data);
      setJobs(data.jobs);
      setStats(data.stats);
    } catch (err) {
      console.error('Error generating report:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}> Job Reports</h1>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.filters}>
          <input
            type="text"
            placeholder="From Date (e.g., Mar 01)"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="To Date (e.g., Mar 31)"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <select name="company" value={filters.company} onChange={handleFilterChange} style={styles.input}>
            <option value="">All Companies</option>
            {companies.map(c => <option key={c}>{c}</option>)}
          </select>
          <select name="location" value={filters.location} onChange={handleFilterChange} style={styles.input}>
            <option value="">All Locations</option>
            {locations.map(l => <option key={l}>{l}</option>)}
          </select>
          <select name="workModel" value={filters.workModel} onChange={handleFilterChange} style={styles.input}>
            <option value="">All Work Models</option>
            {workModels.map(w => <option key={w}>{w}</option>)}
          </select>
          <button 
            onClick={generateReport} 
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Report'}
          </button>
        </div>

        {stats && (
          <div style={styles.statsBox}>
            <h3>📈 Report Summary</h3>
            <p><strong>Total Jobs:</strong> {stats.total}</p>
            <p><strong>Average Salary:</strong> {stats.avgSalary || 'N/A'}</p>
            <p><strong>Work Models:</strong></p>
            <ul>
              {Object.entries(stats.workModelCounts).map(([model, count]) => (
                <li key={model}>{model}: {count}</li>
              ))}
            </ul>
          </div>
        )}

        <h3 style={styles.subheading}>Matching Jobs</h3>
        {jobs.length === 0 ? (
          <p>No matching jobs.</p>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li key={job._id} style={styles.jobItem}>
                <strong>{job['Position Title']}</strong> at {job.Company} ({job.Location})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#f2f4f8',
    minHeight: '100vh',
    padding: '2rem 0'
  },
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1000px',
    margin: 'auto',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.2rem',
    fontWeight: 'bold',
    color: '#1e2a38',
    marginBottom: '2rem'
  },
  subheading: {
    marginTop: '2rem',
    fontSize: '1.4rem',
    color: '#1e2a38'
  },
  filters: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem', 
  },
  input: {
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  button: {
    alignSelf: 'flex-start',  // prevents stretching across the full row
    padding: '0.6rem 1.2rem',
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  statsBox: {
    backgroundColor: '#f8f9fb',
    padding: '1rem 1.5rem',
    borderRadius: '10px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  jobItem: {
    marginBottom: '0.7rem',
    fontSize: '1rem',
    color: '#333'
  },
  error: {
    color: '#dc3545',
    padding: '10px',
    marginBottom: '1rem',
    backgroundColor: '#f8d7da',
    borderRadius: '4px'
  }
};

export default JobReports;
