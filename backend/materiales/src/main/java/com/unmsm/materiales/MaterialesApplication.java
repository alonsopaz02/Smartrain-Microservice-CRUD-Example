package com.unmsm.materiales;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class MaterialesApplication {

    public static void main(String[] args) {
        SpringApplication.run(MaterialesApplication.class, args);
    }

}
