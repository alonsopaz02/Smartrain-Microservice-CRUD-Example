package com.unmsm.materiales.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

public class JwtUtil {

    // Esta clave debe mantenerse segura (por ejemplo, en propiedades o variables de entorno)
    private static final String SECRET = "mysecretkey123456mysecretkey123456"; // mínimo 32 caracteres
    private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    // Tiempo de expiración en milisegundos (por ejemplo, 1 hora)
    private static final long EXPIRATION_TIME = 3600000;

    // Genera un JWT a partir de un username
    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // Valida el token y devuelve el username si es válido, de lo contrario lanza excepción
    public static String validateTokenAndGetUsername(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
}