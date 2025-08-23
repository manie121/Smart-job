import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

// 🔹 Fetch all jobs
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/jobs");
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// 🔹 Create a new job
export const createJob = createAsyncThunk("jobs/createJob", async (jobData, { rejectWithValue }) => {
  try {
    const response = await API.post("/jobs", jobData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// 🔹 Delete a job
export const deleteJob = createAsyncThunk("jobs/deleteJob", async (jobId, { rejectWithValue }) => {
  try {
    await API.delete(`/jobs/${jobId}`);
    return jobId;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// 🔹 Edit/Update a job
export const updateJob = createAsyncThunk("jobs/updateJob", async ({ id, jobData }, { rejectWithValue }) => {
  try {
    const response = await API.put(`/jobs/${id}`, jobData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      // Fetch jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create job
      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete job
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update job
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex((job) => job._id === action.payload._id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default jobsSlice.reducer;
