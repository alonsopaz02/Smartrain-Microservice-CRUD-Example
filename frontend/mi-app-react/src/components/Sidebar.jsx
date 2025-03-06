import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText, Divider, Button, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Estilos personalizados
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 260, // Aumento el tamaño de la barra lateral
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 260,  // Aumento el tamaño de la barra lateral
      boxSizing: 'border-box',
      backgroundColor: theme.palette.primary.main, // Fondo color primario
      color: '#fff',  // Color de texto blanco
      overflow: 'hidden', // Ocultar el desbordamiento del contenido
    },
  },
  toolbar: theme.mixins.toolbar, // Espacio para la toolbar (cabecera superior)
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    width: 60,
    height: 60,
    margin: '20px auto', // Centrar el avatar
    marginBottom: 30, // Espacio entre el avatar y el texto
    '&:hover': {
      // Hover color llamativo
      cursor: 'pointer',
    },
  },
  menuItem: {
    paddingTop: 16, // Más espacio entre las opciones del menú
    paddingBottom: 16,
    marginBottom: 15, // Espacio entre las opciones del menú
    borderRadius: 8, // Bordes redondeados
    transition: 'background-color 0.3s ease, transform 0.3s ease', // Transiciones suaves
    '&:hover': {
      backgroundColor: theme.palette.secondary.light, // Hover color llamativo
      cursor: 'pointer',
      fontWeight: 'bold', // Efecto de escala al pasar el mouse
    },
    '& .MuiListItemText-root': {
      color: '#fff', // Aseguramos que el texto del menú sea blanco
      fontWeight: 'bolder', // Texto en negrita
    },
  },
  button: {
    bottom: -350,  // Botón de cerrar sesión en la parte inferior
    left: 20,
    width: 'calc(100% - 40px)', // Hacer que el botón ocupe todo el ancho disponible
    '&:hover': {
      backgroundColor: theme.palette.error.dark, // Hover para el botón de cerrar sesión
    },
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    navigate('/'); // Redirigir al login
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
    >
      <div className={classes.toolbar} />
      {/* Logo y nombre de la aplicación */}
        <Box sx={{ textAlign: 'center' }}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            variant="h6"
            sx={{
          mt: 2,
          color: '#fff',
          marginBottom: 5,
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          transition: 'transform 0.3s ease',
          fontSize: '1.5rem', // Aumentar el tamaño de la letra
          '&:hover': {
            transform: 'scale(1.1)',
          },
            }}
          >
            SmartTrain
          </Typography>
        </Box>

        <List>
          <ListItem button component={RouterLink} to="/dashboard/materiales" className={classes.menuItem}>
            <ListItemText primary="Materiales" sx={{ fontSize: '1.2rem' }} /> {/* Aumentar el tamaño de la letra */}
          </ListItem>
          <ListItem button component={RouterLink} to="/dashboard/cursos" className={classes.menuItem}>
            <ListItemText primary="Cursos" sx={{ fontSize: '1.2rem' }} /> {/* Aumentar el tamaño de la letra */}
          </ListItem>
          <ListItem button component={RouterLink} to="/dashboard/alumnos" className={classes.menuItem}>
            <ListItemText primary="Alumnos" sx={{ fontSize: '1.2rem' }} /> {/* Aumentar el tamaño de la letra */}
          </ListItem>
        </List>

        <Divider />

        {/* Botón de Cerrar sesión */}
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleLogout}
      >
        Cerrar sesión
      </Button>
    </Drawer>
  );
};

export default Sidebar;
