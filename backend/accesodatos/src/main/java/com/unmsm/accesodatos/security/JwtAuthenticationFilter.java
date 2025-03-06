package com.unmsm.accesodatos.security;

import com.unmsm.accesodatos.util.JwtUtil;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    // Permitir libre acceso al endpoint /login
    private static final String LOGIN_URI = "/login";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();

        // Si es la ruta de login, dejamos pasar sin validar el JWT
        if (path.equals(LOGIN_URI)) {
            return chain.filter(exchange);
        }

        // Buscar el header Authorization
        String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return unauthorizedResponse(exchange, "Token ausente o mal formado");
        }

        String token = authHeader.substring(7);
        try {
            // Validamos el token y obtenemos el username
            String username = JwtUtil.validateTokenAndGetUsername(token);
            // Creamos una nueva solicitud que incluya los headers necesarios:
            // - "X-User" para pasar el username
            // - "X-From-Gateway" para indicar que la solicitud viene del API Gateway
            ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                    .header("X-User", username)
                    .header("X-From-Gateway", "true")
                    .header("Access-Control-Allow-Origin","true")
                    .build();
            ServerWebExchange mutatedExchange = exchange.mutate().request(mutatedRequest).build();
            return chain.filter(mutatedExchange);
        } catch (Exception e) {
            return unauthorizedResponse(exchange, "Token inválido: " + e.getMessage());
        }

    }

    private Mono<Void> unauthorizedResponse(ServerWebExchange exchange, String message) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);
        byte[] bytes = ("{\"error\": \"" + message + "\"}").getBytes(StandardCharsets.UTF_8);
        return exchange.getResponse().writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(bytes)));
    }

    // Aseguramos que este filtro se ejecute antes de otros (por ejemplo, en orden 0)
    @Override
    public int getOrder() {
        return -1;
    }
}
