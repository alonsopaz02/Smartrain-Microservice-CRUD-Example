package com.unmsm.accesodatos.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreCurso;

    private String descripcion;
}
