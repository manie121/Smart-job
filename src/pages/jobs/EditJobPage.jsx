import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, updateJob } from "../../Slice/JobsSlice";
import PostJobPage from "./PostJobPage";

const EditJobPage = () => {
  const { id } = useParams(); // MongoDB _id from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { jobs2, loading } = useSelector((state) => state.jobs);
  const [job, setJob] = useState(null);

  // fetch jobs if not already loaded
  useEffect(() => {
    if (!jobs2 || jobs2.length === 0) {
      dispatch(fetchJobs());
    }
  }, [dispatch, jobs2]);

  // find job once jobs are available
  useEffect(() => {
    if (jobs2 && jobs2.length > 0) {
      const existingJob = jobs2.find((j) => j._id === id);
      if (existingJob) {
        setJob(existingJob);
      } else {
        navigate("/jobs/manage");
      }
    }
  }, [jobs2, id, navigate]);

  // handle update
  const handleUpdate = async (updatedJob) => {
    if (!job || !job._id) {
      console.error(" No job ID found");
      return;
    }
  
    console.log(" Sending update for ID:", job._id);
  
    await dispatch(updateJob({ id: job._id, updatedData: updatedJob }));
    navigate("/jobs/manage");
  };
  

  if (loading) return <p>Loading...</p>;

  return job ? (
    <PostJobPage editMode={true} existingJob={job} onUpdate={handleUpdate} />
  ) : null;
};

export default EditJobPage;
