import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    fetch(`https://cs348-458507.uc.r.appspot.com/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`https://cs348-458507.uc.r.appspot.com/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    navigate('/');
  };

  return (
    <div style={styles.container}>
      

      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>Edit Job Details</h3>
        {Object.keys(form).map((key) => (
          key !== '_id' && (
            <div key={key} style={styles.inputGroup}>
              <label style={styles.label}>{key}</label>
              <input
                name={key}
                value={form[key]}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          )
        ))}
        <button type="submit" style={styles.submitButton}>Save Changes</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '900px',
    margin: 'auto'
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '1.5rem 2rem',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  location: {
    fontWeight: 'bold',
    fontSize: '0.95rem',
    color: '#666'
  },
  subHeader: {
    margin: '0.5rem 0 0.2rem 0',
    fontWeight: 'normal',
    color: '#444'
  },
  date: {
    marginBottom: '1rem',
    color: '#777'
  },
  applyLink: {
    display: 'inline-block',
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    textDecoration: 'none',
    marginTop: '1rem'
  },
  form: {
    backgroundColor: '#fff',
    padding: '1.5rem 2rem',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  inputGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '0.3rem'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '0.6rem 1.2rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default EditJob;
