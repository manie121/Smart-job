import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostJobPage from './PostJobPage';

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const existingJob = jobs.find(j => j.id === Number(id));
    if (existingJob) setJob(existingJob);
    else navigate('/jobs/manage');
  }, [id, navigate]);

  const handleUpdate = (updatedJob) => {
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const updatedJobs = jobs.map(j => (j.id === Number(id) ? updatedJob : j));
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    navigate('/jobs/manage');
  };

  return job ? (
    <PostJobPage editMode={true} existingJob={job} onUpdate={handleUpdate} />
  ) : null;
};

export default EditJobPage;
