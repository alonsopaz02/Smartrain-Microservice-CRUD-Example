import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Materiales from './components/Materiales';
import Cursos from './components/Cursos';
import Alumnos from './components/Alumnos';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '100vw', backgroundColor: '#e0e0e0', overflow: 'hidden' }}>
          {/* Sidebar solo se muestra en rutas protegidas */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas con PrivateRoute */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="materiales" element={<Materiales />} />
                <Route path="cursos" element={<Cursos />} />
                <Route path="alumnos" element={<Alumnos />} />
              </Route>
            </Route>
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
