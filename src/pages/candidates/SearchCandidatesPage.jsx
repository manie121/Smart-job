import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchCandidatesPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Search Candidates
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Find candidates by skills, experience level, and location filters
      </Typography>

      <Card>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Search sx={{ fontSize: 64, color: 'secondary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Advanced Candidate Search
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This page will contain search filters and candidate results with skills and filters matching.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SearchCandidatesPage;
