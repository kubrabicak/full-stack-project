package com.project.ums.repository;

import com.project.ums.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private User user1;
    private User user2;

    @BeforeEach
    void setUp() {
        // Initialize the User objects
        user1 = new User();
        user1.setFullName("Harry Potter");
        user1.setDisplayName("Harry P");
        user1.setEmail("harryp@example.com");
        user1.setDetails("Some details about Harry Potter.");

        user2 = new User();
        user2.setFullName("Jane Potter");
        user2.setDisplayName("Jane P");
        user2.setEmail("jane@potter.com");
        user2.setDetails("Some details about Jane Potter.");
    }

    @Test
    void saveAll_shouldPersistUsersToDatabase() {

        // Arrange
        List<User> users = List.of(user1, user2);

        // Act
        userRepository.saveAll(users); // Persist users
        List<User> savedUsers = userRepository.findAll(); // Retrieve saved users

        // Assert
        assertEquals(2, savedUsers.size(), "Expected 2 users to be saved.");
        assertEquals("Harry Potter", savedUsers.get(0).getFullName(), "Full name of first user should be 'Harry Potter'.");
        assertEquals("Jane Potter", savedUsers.get(1).getFullName(), "Full name of second user should be 'Jane Potter'.");
    }

    @Test
    void findAll_whenNoUsersSaved_shouldReturnEmptyList() {
        // Act
        List<User> users = userRepository.findAll();

        // Assert
        assertTrue(users.isEmpty(), "Expected no users in database.");
    }
}

