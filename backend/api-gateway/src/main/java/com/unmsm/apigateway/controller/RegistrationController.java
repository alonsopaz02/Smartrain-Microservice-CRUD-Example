package com.unmsm.apigateway.controller;

import com.unmsm.apigateway.entity.AppUser;
import com.unmsm.apigateway.repository.AppUserRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // 👈 permite solicitudes desde tu frontend
public class RegistrationController {

    @Autowired
    private AppUserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // DTO para registrar al usuario (se puede reutilizar el mismo AuthRequest)
    @Getter
    public static class RegistrationRequest {
        // Getters y setters
        private String username;
        private String password;

        public void setUsername(String username) {
            this.username = username;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest request) {
        // Verificar si el usuario ya existe
        if(userRepository.findByUsername(request.getUsername()).isPresent()){
            return ResponseEntity.badRequest().body("El usuario ya existe");
        }

        AppUser newUser = new AppUser();
        newUser.setUsername(request.getUsername());
        // Hasheamos la contraseña antes de almacenarla
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(newUser);

        return ResponseEntity.ok("Usuario creado exitosamente");
    }
}