import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip,
  IconButton, Tooltip
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { fetchJobs ,deleteJob} from '../../Slice/JobsSlice';

const ManageJobsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs2 } = useSelector((state) => state.jobs);
  

  useEffect(() => {
    dispatch(fetchJobs());

  }, [dispatch]);
    

  const handleDelete = (id) => {
    dispatch(deleteJob(id));
    alert(`job Deleted Successfully:${id}`);
    dispatch(fetchJobs())};
    

  const handleEdit = (id) => {
    navigate(`/jobs/edit/${id}`);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Manage Job Listings
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Edit or remove existing job postings
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Salary</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Experience</strong></TableCell>
              <TableCell><strong>Skills</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs2.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.jobTitle}</TableCell>
                <TableCell>{job.jobDescription}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>₹{job.minSalary} - ₹{job.maxSalary}</TableCell>
                <TableCell>{job.jobType}</TableCell>
                <TableCell>{job.experienceLevel}</TableCell>
                <TableCell>
                  {job.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                  
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleEdit(job._id)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDelete(job._id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {jobs2.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageJobsPage;