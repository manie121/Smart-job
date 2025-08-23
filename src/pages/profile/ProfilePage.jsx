import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import { Edit, Person, Save, Cancel } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext.jsx';

const ProfilePage = () => {
  const { user, setUser } = useAuth(); // ✅ make sure your AuthContext provides setUser
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user || {});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData); // update context
    localStorage.setItem("user", JSON.stringify(formData)); // optional persistence
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setEditMode(false);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Recruiter Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your profile information and company details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mr: 3,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}
                >
                  {formData?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  {editMode ? (
                    <>
                      <TextField
                        fullWidth
                        name="name"
                        label="Full Name"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        name="role"
                        label="Role"
                        value={formData.role || ''}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        name="company"
                        label="Company"
                        value={formData.company || ''}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                      />
                    </>
                  ) : (
                    <>
                      <Typography variant="h5" fontWeight="bold">
                        {user?.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {user?.role} at {user?.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user?.email}
                      </Typography>
                    </>
                  )}
                </Box>
                {editMode ? (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Profile Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This section will contain editable profile information including logo, description, and industry details as mentioned in the requirements.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Person sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Company Verification
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Upload documents for company verification
              </Typography>
              <Button variant="contained" fullWidth>
                Verify Company
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
