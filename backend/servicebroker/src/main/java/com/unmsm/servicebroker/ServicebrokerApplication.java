package com.unmsm.servicebroker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class ServicebrokerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServicebrokerApplication.class, args);
	}

}
