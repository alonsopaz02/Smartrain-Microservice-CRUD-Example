package com.unmsm.apigateway.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class AppUser {

    @Id
    @Column(length = 100)
    private String username;  // Usamos el username como ID único

    // La contraseña se almacenará hasheada (por ejemplo, con BCrypt)
    private String password;
}