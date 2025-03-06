package com.unmsm.accesodatos.repository;

import com.unmsm.accesodatos.entity.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlumnoRepository extends JpaRepository<Alumno, String> {
    // Aquí puedes definir métodos de consulta personalizados si es necesario.
}