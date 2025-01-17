package com.project.ums;

import com.project.ums.user.service.DataLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class UmsApplication {

	@Autowired
	private DataLoader dataLoader;

	public static void main(String[] args) {
		SpringApplication.run(UmsApplication.class, args);
	}

	@Bean
	public CommandLineRunner run() {
		return args -> {
			// Load users on application startup
			dataLoader.loadUsersFromJson();
		};
	}
}

