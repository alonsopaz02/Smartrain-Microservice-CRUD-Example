package com.unmsm.accesodatos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class AccesodatosApplication {

    public static void main(String[] args) {
        SpringApplication.run(AccesodatosApplication.class, args);
    }

}
