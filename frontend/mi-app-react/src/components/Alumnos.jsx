import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Paper, Grid } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [editCodigo, setEditCodigo] = useState(null);

  useEffect(() => {
    // Obtener todos los alumnos al cargar el componente
    axios.get('http://localhost:8082/api/accesodatos/alumnos', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => setAlumnos(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddAlumno = () => {
    // Crear un nuevo alumno
    axios.post('http://localhost:8082/api/accesodatos/alumnos', {
      codigo,
      nombre,
      carrera,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        setAlumnos([...alumnos, response.data]);
        setCodigo('');
        setNombre('');
        setCarrera('');
      })
      .catch(error => console.error(error));
  };

  const handleDeleteAlumno = (codigo) => {
    // Eliminar un alumno por código
    axios.delete(`http://localhost:8082/api/accesodatos/alumnos/${codigo}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => setAlumnos(alumnos.filter(alumno => alumno.codigo !== codigo)))
      .catch(error => console.error(error));
  };

  const handleUpdateAlumno = () => {
    // Actualizar un alumno existente
    axios.put(`http://localhost:8082/api/accesodatos/alumnos/${editCodigo}`, {
      codigo: editCodigo,
      nombre,
      carrera,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        setAlumnos(alumnos.map(alumno => (alumno.codigo === editCodigo ? response.data : alumno)));
        setEditCodigo(null);
        setCodigo('');
        setNombre('');
        setCarrera('');
      })
      .catch(error => console.error(error));
  };

  const handleEditClick = (alumno) => {
    // Cargar los datos del alumno para editar
    setEditCodigo(alumno.codigo);
    setCodigo(alumno.codigo);
    setNombre(alumno.nombre);
    setCarrera(alumno.carrera);
  };

  return (
    <Container component={Paper} sx={{ padding: 4, marginTop: 4, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Gestión de Alumnos
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Código del Alumno"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              disabled={editCodigo !== null} // Deshabilitar cuando estamos editando
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Carrera"
              value={carrera}
              onChange={(e) => setCarrera(e.target.value)}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={editCodigo ? handleUpdateAlumno : handleAddAlumno}
          >
            {editCodigo ? 'Actualizar' : 'Agregar'}
          </Button>
        </Box>
      </Box>

      <Box sx={{ overflowY: 'auto', maxHeight: '400px' }}>
        <Table stickyHeader>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Código</TableCell>
              <TableCell sx={{ color: '#fff' }}>Nombre</TableCell>
              <TableCell sx={{ color: '#fff' }}>Carrera</TableCell>
              <TableCell sx={{ color: '#fff' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alumnos.map((alumno) => (
              <TableRow key={alumno.codigo}>
                <TableCell>{alumno.codigo}</TableCell>
                <TableCell>{alumno.nombre}</TableCell>
                <TableCell>{alumno.carrera}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleEditClick(alumno)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDeleteAlumno(alumno.codigo)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default Alumnos;
