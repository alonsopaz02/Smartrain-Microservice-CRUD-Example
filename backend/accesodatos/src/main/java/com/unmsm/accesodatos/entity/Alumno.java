package com.unmsm.accesodatos.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Alumno {

    @Id
    @Column(length=128)
    private String codigo;  // Código único para identificar al alumno

    private String nombre;
    private String carrera;

    // Constructores, getters y setters
}
