import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const JobsManager = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    Date: '',
    Apply: '',
    'Position Title': '',
    Company: '',
    'Company Size': '',
    'Company Industry': '',
    Location: '',
    'Work Model': '',
    Salary: '',
    Qualifications: ''
  });

  const fetchJobs = async () => {
    try {
      const res = await fetch('https://cs348-458507.uc.r.appspot.com/api/jobs');
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://cs348-458507.uc.r.appspot.com/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        await fetchJobs();
        setForm({
          Date: '',
          Apply: '',
          'Position Title': '',
          Company: '',
          'Company Size': '',
          'Company Industry': '',
          Location: '',
          'Work Model': '',
          Salary: '',
          Qualifications: ''
        });
      }
    } catch (err) {
      console.error('Failed to create job:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://cs348-458507.uc.r.appspot.com/api/jobs/${id}`, {
        method: 'DELETE'
      });
      await fetchJobs();
    } catch (err) {
      console.error('Failed to delete job:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>JobConnect Admin Panel</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.sectionTitle}>Create New Job</h3>
          <div style={styles.formGrid}>
            {Object.keys(form).map((key) => (
              <div key={key} style={styles.inputGroup}>
                <label style={styles.label}>{key}</label>
                <input
                  name={key}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  style={styles.input}
                />
              </div>
            ))}
          </div>
          <button type="submit" style={styles.submitButton}>Create Job</button>
        </form>

        <div style={styles.sectionWithButton}>
          <h3 style={styles.sectionTitle}>Current Jobs</h3>
          <Link to="/reports">
            <button style={styles.reportsButton}>📊 View Reports</button>
          </Link>
        </div>

        <div>
          {jobs.map((job) => (
            <div key={job._id} style={styles.jobCard}>
              <div style={styles.jobHeader}>
                <h4 style={styles.jobTitle}>{job['Position Title']}</h4>
                <span style={styles.location}>{job.Location}</span>
              </div>
              <p style={styles.company}>{job.Company}</p>
              <p style={styles.date}>Posted on: {job.Date}</p>

              <div style={styles.buttonGroup}>
                {job.Apply && (
                  <a
                    href={job.Apply}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.applyBtn}
                  >
                    Apply →
                  </a>
                )}
                <Link to={`/edit/${job._id}`}>
                  <button style={styles.editBtn}>Edit</button>
                </Link>
                <button onClick={() => handleDelete(job._id)} style={styles.deleteBtn}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
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
    padding: '2rem'
  },
  pageTitle: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#1e2a38'
  },
  sectionWithButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  reportsButton: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '0.5rem 1rem',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: '#1e2a38',
    margin: 0
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '1rem 1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    marginBottom: '2rem'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '1rem',
    rowGap: '1rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '0.3rem',
    color: '#333'
  },
  input: {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '0.6rem 1.2rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '1.5rem'
  },
  jobCard: {
    backgroundColor: '#ffffff',
    padding: '1rem 1.5rem',
    borderRadius: '10px',
    marginBottom: '1.5rem',
    boxShadow: '0 1px 6px rgba(0,0,0,0.08)'
  },
  jobHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  jobTitle: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#1e2a38'
  },
  company: {
    margin: '0.3rem 0',
    color: '#333'
  },
  location: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#5f6c7b'
  },
  date: {
    fontSize: '0.85rem',
    color: '#777'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem'
  },
  applyBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  editBtn: {
    backgroundColor: '#f1c40f',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default JobsManager;
