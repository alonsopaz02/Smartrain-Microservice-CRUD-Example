package com.unmsm.accesodatos.controller;

import com.unmsm.accesodatos.entity.Curso;
import com.unmsm.accesodatos.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
@CrossOrigin // 👈 permite solicitudes desde tu frontend
@RestController
@RequestMapping("/api/accesodatos/cursos")
public class CursoController {

    @Autowired
    private CursoRepository cursoRepository;

    @GetMapping
    public List<Curso> listarCursos() {
        return cursoRepository.findAll();
    }

    @PostMapping
    public Curso registrarCurso(@RequestBody Curso curso) {
        return cursoRepository.save(curso);
    }

    @PutMapping("/{id}")
    public Curso actualizarCurso(@PathVariable Long id, @RequestBody Curso cursoActualizado) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
        curso.setNombreCurso(cursoActualizado.getNombreCurso());
        curso.setDescripcion(cursoActualizado.getDescripcion());
        return cursoRepository.save(curso);
    }

    @DeleteMapping("/{id}")
    public void eliminarCurso(@PathVariable Long id) {
        cursoRepository.deleteById(id);
    }
}
