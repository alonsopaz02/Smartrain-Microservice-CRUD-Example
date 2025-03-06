import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Grid, Card, CardContent, Link, TextField, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';

const Materiales = () => {
  const [cursos, setCursos] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMaterialLink, setNewMaterialLink] = useState('');
  const [selectedCursoForMaterial, setSelectedCursoForMaterial] = useState('');
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [isEditingMaterial, setIsEditingMaterial] = useState(false);
  const [isDeletingMaterial, setIsDeletingMaterial] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8082/api/accesodatos/cursos', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => setCursos(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleCursoSelect = (curso) => {
    axios.get(`http://localhost:8083/api/materiales/curso/${curso.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        setMateriales(response.data);
        setSelectedCurso(curso);
      })
      .catch(error => console.error(error));
  };

  const handleBackToCursos = () => {
    setSelectedCurso(null);
    setMateriales([]);
  };

  const handleAddMaterial = () => {
    if (selectedCursoForMaterial && newMaterialLink) {
      axios.post('http://localhost:8083/api/materiales', {
        cursoCodigo: selectedCursoForMaterial,
        link: newMaterialLink,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(response => {
          setMateriales([...materiales, response.data]);
          setNewMaterialLink('');
          setSelectedCursoForMaterial('');
          setIsAddingMaterial(false);
          setSuccessMessage(true); 
        })
        .catch(error => console.error(error));
    }
  };

  const handleEditMaterial = () => {
    if (selectedMaterial && newMaterialLink) {
      axios.put(`http://localhost:8083/api/materiales/${selectedMaterial.id}`, {
        cursoCodigo: selectedMaterial.cursoCodigo,
        link: newMaterialLink,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(response => {
          setMateriales(materiales.map(m => m.id === selectedMaterial.id ? response.data : m));
          setIsEditingMaterial(false);
          setSelectedMaterial(null);
          setSuccessMessage(true);
        })
        .catch(error => console.error(error));
    }
  };

  const handleDeleteMaterial = () => {
    if (selectedMaterial) {
      axios.delete(`http://localhost:8083/api/materiales/${selectedMaterial.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(() => {
          setMateriales(materiales.filter(m => m.id !== selectedMaterial.id));
          setIsDeletingMaterial(false);
          setSelectedMaterial(null);
          setSuccessMessage(true);
        })
        .catch(error => console.error(error));
    }
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage(false);
  };

  const filteredCursos = cursos.filter(curso =>
    curso.nombreCurso.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: '#e0e0e0', minHeight: '100vh' }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
        {selectedCurso ? `Materiales del Curso: ${selectedCurso.nombreCurso}` : 'Materiales'}
      </Typography>

      {!selectedCurso && (
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Button
              variant="contained"
              sx={{ mr: 2, backgroundColor: '#0077b5' }}
              onClick={() => setIsAddingMaterial(!isAddingMaterial)}
            >
              Agregar Materiales
            </Button>
            
          </Box>
          <TextField
            variant="outlined"
            placeholder="Buscar curso"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: '300px' }}
          />
        </Box>
      )}

      {/* Mostrar formulario de agregar material */}
      {isAddingMaterial && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0077b5' }}>Agregar nuevo material</Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="select-curso-label">Curso</InputLabel>
            <Select
              labelId="select-curso-label"
              value={selectedCursoForMaterial}
              onChange={(e) => setSelectedCursoForMaterial(e.target.value)}
              label="Curso"
            >
              {cursos.map((curso) => (
                <MenuItem key={curso.id} value={curso.id}>
                  {curso.nombreCurso}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            label="Link del Material"
            value={newMaterialLink}
            onChange={(e) => setNewMaterialLink(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#ff1744' }}
              onClick={() => setIsAddingMaterial(false)}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              sx={{ backgroundColor: '#0077b5' }}
              onClick={handleAddMaterial}
            >
              Agregar Material
            </Button>
          </Box>
        </Box>
      )}

      {/* Mostrar formulario de edición */}
      {/* Mostrar formulario de edición */}
{isEditingMaterial && selectedMaterial && (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0077b5' }}>Editar Material</Typography>
    <Typography variant="body1" sx={{ color: 'black' }}>Material actual: {selectedMaterial.link}</Typography> {/* Cambié el color aquí */}

    <TextField
      variant="outlined"
      label="Nuevo Link del Material"
      value={newMaterialLink}
      onChange={(e) => setNewMaterialLink(e.target.value)}
      fullWidth
      sx={{ mt: 2 }}
    />

    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#ff1744' }}
        onClick={() => setIsEditingMaterial(false)}
      >
        Cancelar
      </Button>

      <Button
        variant="contained"
        sx={{ backgroundColor: '#0077b5' }}
        onClick={handleEditMaterial}
      >
        Guardar Cambios
      </Button>
    </Box>
  </Box>
)}


      {/* Mostrar formulario de eliminación */}
      {isDeletingMaterial && selectedMaterial && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0077b5' }}>Eliminar Material</Typography>
          <Typography variant="body1" sx={{ color: 'black' }}>¿Estás seguro de que deseas eliminar este material?</Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>{selectedMaterial.link}</Typography>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#ff1744' }}
              onClick={handleDeleteMaterial}
            >
              Eliminar
            </Button>

            <Button
              variant="contained"
              sx={{ backgroundColor: '#ff4081' }}
              onClick={() => setIsDeletingMaterial(false)}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      )}

      {/* Mensaje de éxito */}
      {successMessage && (
        <Box sx={{ mb: 3 }}>
          <Alert
            severity="success"
            action={
              <Button color="inherit" size="small" onClick={handleCloseSuccessMessage}>
                OK
              </Button>
            }
          >
            Acción completada correctamente
          </Alert>
        </Box>
      )}

      {/* Mostrar los materiales del curso seleccionado */}
      {!selectedCurso ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between',marginTop: 5, height: '100vh' }}>
          <Grid container spacing={3} sx={{ maxHeight: '65vh', overflowY: 'auto', flexGrow: 1 }}>
            {filteredCursos.map(curso => (
              <Grid item xs={12} sm={6} md={4} key={curso.id}>
                <Card sx={{ cursor: 'pointer', transition: '0.3s', '&:hover': { boxShadow: 6 }, minHeight: '150px' }} onClick={() => handleCursoSelect(curso)}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'medium', color: 'black' }}>{curso.nombreCurso}</Typography>
                    <Typography variant="body2" color="text.secondary">{curso.descripcion}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box>
          <Button variant="contained" color="primary" onClick={handleBackToCursos}>
            Volver a los Cursos
          </Button>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {materiales.map((material, index) => (
              <Grid item xs={12} sm={6} md={4} key={material.id}>
                <Card sx={{ transition: '0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 }, minHeight: '150px' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: 'black' }}>Material {index + 1}</Typography>
                    <Link href={material.link} target="_blank" rel="noopener" underline="hover" color="primary" sx={{ wordBreak: 'break-all' }}>
                      {material.link}
                    </Link>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ color: 'black' }}
                        onClick={() => { setSelectedMaterial(material); setIsEditingMaterial(true); }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ ml: 1 }}
                        onClick={() => { setSelectedMaterial(material); setIsDeletingMaterial(true); }}
                      >
                        Eliminar
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Materiales;
