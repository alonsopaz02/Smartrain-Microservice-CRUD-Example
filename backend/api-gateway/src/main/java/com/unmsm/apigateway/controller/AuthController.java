package com.unmsm.apigateway.controller;

import com.unmsm.apigateway.util.JwtUtil;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.unmsm.apigateway.entity.AppUser;
import com.unmsm.apigateway.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;


@RestController
@CrossOrigin(origins = "http://localhost:5173") // 👈 permite solicitudes desde tu frontend
public class AuthController {

    @Autowired
    private AppUserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        // Buscar el usuario en la base de datos
        AppUser appUser = userRepository.findByUsername(authRequest.getUsername()).orElse(null);
        if (appUser == null) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
        // Comparar la contraseña recibida con la hasheada
        if (!passwordEncoder.matches(authRequest.getPassword(), appUser.getPassword())) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
        // Generar el token JWT
        String token = JwtUtil.generateToken(appUser.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }
}

@Getter
class AuthRequest {
    // Getters y setters
    private String username;
    private String password;

    public void setUsername(String username) { this.username = username; }

    public void setPassword(String password) { this.password = password; }
}

@Getter
class AuthResponse {
    private String token;

    public AuthResponse(String token) { this.token = token; }

    public void setToken(String token) { this.token = token; }
}
