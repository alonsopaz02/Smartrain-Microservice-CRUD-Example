import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Paper } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [nombreCurso, setNombreCurso] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8082/api/accesodatos/cursos', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => setCursos(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddCurso = () => {
    axios.post('http://localhost:8082/api/accesodatos/cursos', {
      nombreCurso,
      descripcion,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        setCursos([...cursos, response.data]);
        setNombreCurso('');
        setDescripcion('');
      })
      .catch(error => console.error(error));
  };

  const handleDeleteCurso = (id) => {
    axios.delete(`http://localhost:8082/api/accesodatos/cursos/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => setCursos(cursos.filter(curso => curso.id !== id)))
      .catch(error => console.error(error));
  };

  const handleUpdateCurso = (id) => {
    axios.put(`http://localhost:8082/api/accesodatos/cursos/${id}`, {
      nombreCurso,
      descripcion,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        setCursos(cursos.map(curso => (curso.id === id ? response.data : curso)));
        setEditId(null);
        setNombreCurso('');
        setDescripcion('');
      })
      .catch(error => console.error(error));
  };

  const handleEditClick = (curso) => {
    setEditId(curso.id);
    setNombreCurso(curso.nombreCurso);
    setDescripcion(curso.descripcion);
  };

  return (
    <Container component={Paper} sx={{ padding: 4, marginTop: 4, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Gestión de Cursos
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="Nombre del Curso"
          value={nombreCurso}
          onChange={(e) => setNombreCurso(e.target.value)}
        />
        <TextField
          fullWidth
          label="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={editId ? () => handleUpdateCurso(editId) : handleAddCurso}>
          {editId ? 'Actualizar' : 'Agregar'}
        </Button>
      </Box>

      <Box sx={{ overflowY: 'auto', maxHeight: '400px' }}>
        <Table stickyHeader>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Nombre del Curso</TableCell>
              <TableCell sx={{ color: '#fff' }}>Descripción</TableCell>
              <TableCell sx={{ color: '#fff' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cursos.map((curso) => (
              <TableRow key={curso.id}>
                <TableCell>{curso.nombreCurso}</TableCell>
                <TableCell>{curso.descripcion}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleEditClick(curso)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDeleteCurso(curso.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default Cursos;