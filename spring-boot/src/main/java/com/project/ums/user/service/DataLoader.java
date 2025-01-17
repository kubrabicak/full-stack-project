package com.project.ums.user.service;

import com.project.ums.user.model.User;
import com.project.ums.user.repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class DataLoader {

    @Autowired
    private UserRepository userRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public void loadUsersFromJson() {
        try {
            // Point to the file in resources folder
            File file = new File("src/main/resources/users.json");

            // Check if the file exists
            if (file.exists()) {
                // Read and map the JSON file to List<User>
                JsonNode rootNode = objectMapper.readTree(file);
                JsonNode usersNode = rootNode.get("users");

                // If the 'users' field is present and it's an array
                if (usersNode != null && usersNode.isArray()) {
                    // Convert JSON array to List<User>
                    List<User> users = objectMapper.readValue(usersNode.toString(), new TypeReference<>() {
                    });

                    // Save all users to the database
                    userRepository.saveAll(users);

                    System.out.println("Users have been loaded and saved to the database.");
                }
            } else {
                System.out.println("users.json file not found, skipping data load.");
            }
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error loading users from JSON.");
        }
    }
}
