package com.project.ums.user.service;

import com.project.ums.user.model.User;
import com.project.ums.user.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Service
public class UserDataLoaderService {

    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserDataLoaderService.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    public UserDataLoaderService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void loadUsersFromJson() {
        Optional.ofNullable(readUsersFromJson())
                .filter(users -> !users.isEmpty()) // Filter out empty lists
                .ifPresentOrElse(
                        this::saveUsersToDatabase,
                        () -> logger.warn("No users found in JSON file, skipping data load.")
                );
    }

    List<User> readUsersFromJson() {
        Resource resource = new ClassPathResource("users.json");
        List<User> users = null;

        if (!resource.exists()) {
            logger.info("users.json file not found in the classpath, skipping data load.");
            return users;
        }

        try (InputStream inputStream = resource.getInputStream()) {
            JsonNode rootNode = objectMapper.readTree(inputStream);
            JsonNode usersNode = rootNode.get("users");

            if (usersNode != null && usersNode.isArray()) {
                users = objectMapper.readValue(usersNode.toString(), objectMapper.getTypeFactory().constructCollectionType(List.class, User.class));
                logger.info("{} users found in the JSON file.", users.size());
            }
        } catch (IOException e) {
            logger.error("Error loading users from JSON.", e);
        }

        return users;
    }

    private void saveUsersToDatabase(List<User> users) {
        userRepository.saveAll(users);
        logger.info("{} users have been saved to the database.", users.size());
    }
}