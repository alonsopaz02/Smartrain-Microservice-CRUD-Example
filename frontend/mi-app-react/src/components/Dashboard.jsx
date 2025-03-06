import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex',overflow: 'hidden' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#e0e0e0',
          padding: 3,
        }}
      >
        <Container>
          <Outlet /> {/* Esto se renderiza según la ruta elegida */}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
