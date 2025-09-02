import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

// Create profile
export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post("/profiles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.profile;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error creating profile");
    }
  }
);

// Get single profile
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/profiles/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error fetching profile");
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axios.put(`/profiles/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.profile;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error updating profile");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,   // ✅ single profile object
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
