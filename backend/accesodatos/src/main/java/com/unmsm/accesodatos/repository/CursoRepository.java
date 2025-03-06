package com.unmsm.accesodatos.repository;

import com.unmsm.accesodatos.entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CursoRepository extends JpaRepository<Curso, Long> {
    // Métodos personalizados, si fueran necesarios.
}