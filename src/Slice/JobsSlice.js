import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

// Create job
export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (jobData, thunkApi) => {
    try {
      const res = await axios.post(`jobs/create`, jobData);
      return res.data.job;
    } catch (err) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || "Failed to create job"
      );
    }
  }
);

// Fetch jobs
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`jobs/all`);
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || "Failed to fetch jobs"
      );
    }
  }
);

// Update job
export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, updatedData }, thunkApi) => {
    try {
      const res = await axios.put(`jobs/${id}`, updatedData);
      return res.data.job;
    } catch (err) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || "Failed to update job"
      );
    }
  }
);


// Delete job
export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId, thunkApi) => {
    try {
      await axios.delete(`jobs/${jobId}`);
      return jobId;
    } catch (err) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || "Failed to delete job"
      );
    }
  }
);

const initialState = {
  jobs2: [],
  loading: false,
  error: null,
  success: false,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Create
    builder.addCase(createJob.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createJob.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.jobs2.push(action.payload);
    });
    builder.addCase(createJob.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch
    builder.addCase(fetchJobs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.jobs2 = action.payload;
    });
    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update
    builder.addCase(updateJob.fulfilled, (state, action) => {
      state.success = true;
      const index = state.jobs2.findIndex(
        (job) => job._id === action.payload._id
      );
      if (index !== -1) {
        state.jobs2[index] = action.payload;
      }
    });

    // Delete
    builder.addCase(deleteJob.fulfilled, (state, action) => {
      state.jobs2 = state.jobs2.filter((job) => job._id !== action.payload);
    });
  },
});

export const { clearSuccess } = jobSlice.actions;
export default jobSlice.reducer;
