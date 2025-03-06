package com.unmsm.accesodatos.controller;

import com.unmsm.accesodatos.entity.Alumno;
import com.unmsm.accesodatos.repository.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") // 👈 permite solicitudes desde tu frontend
@RestController
@RequestMapping("/api/accesodatos/alumnos")
public class AlumnoController {

    @Autowired
    private AlumnoRepository alumnoRepository;

    // Obtener todos los alumnos
    @GetMapping
    public List<Alumno> getAllAlumnos() {
        return alumnoRepository.findAll();
    }

    // Obtener un alumno por ID
    @GetMapping("/{id}")
    public ResponseEntity<Alumno> getAlumnoById(@PathVariable String id) {
        Optional<Alumno> alumnoOpt = alumnoRepository.findById(id);
        return alumnoOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo alumno
    @PostMapping
    public Alumno createAlumno(@RequestBody Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    // Actualizar un alumno existente
    @PutMapping("/{codigo}")
    public ResponseEntity<Alumno> updateAlumno(@PathVariable("codigo") String codigo,
                                               @RequestBody Alumno alumnoDetails) {
        Optional<Alumno> alumnoOpt = alumnoRepository.findById(codigo);
        if (alumnoOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Alumno alumno = alumnoOpt.get();
        alumno.setNombre(alumnoDetails.getNombre());
        alumno.setCarrera(alumnoDetails.getCarrera());
        // El código (id) no se modifica, ya que es la clave primaria

        Alumno updatedAlumno = alumnoRepository.save(alumno);
        return ResponseEntity.ok(updatedAlumno);
    }

    // Eliminar un alumno
    @DeleteMapping("/{codigo}")
    public ResponseEntity<Void> deleteAlumno(@PathVariable String codigo) {
        if(!alumnoRepository.existsById(codigo)){
            return ResponseEntity.notFound().build();
        }
        alumnoRepository.deleteById(codigo);
        return ResponseEntity.noContent().build();
    }
}
