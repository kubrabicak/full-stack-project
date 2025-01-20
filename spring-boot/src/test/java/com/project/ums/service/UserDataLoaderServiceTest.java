package com.project.ums.service;

import com.project.ums.model.User;
import com.project.ums.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserDataLoaderServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserDataLoaderService userDataLoaderService;

    private User user;

    @BeforeEach
    void setUp() {
        // Initialize the User object
        user = new User();
        long userId = 1L;
        user.setId(userId);
        user.setFullName("Harry Potter");
        user.setDisplayName("Harry P");
        user.setEmail("harryp@example.com");
        user.setDetails("harryp@example.com");
    }

    @Test
    void loadUsersFromJson_whenFileExists_shouldSaveUsersToDatabase() {
        // Arrange
        List<User> mockUsers = List.of(user);

        UserDataLoaderService serviceSpy = spy(userDataLoaderService);
        doReturn(mockUsers).when(serviceSpy).readUsersFromJson();

        // Act
        serviceSpy.loadUsersFromJson();

        // Assert
        verify(userRepository, times(1)).saveAll(mockUsers);
    }

    @Test
    void readUsersFromJson_whenJsonIsEmpty_shouldReturnEmptyList() {
        // Arrange
        UserDataLoaderService serviceSpy = spy(userDataLoaderService);
        doReturn(Collections.emptyList()).when(serviceSpy).readUsersFromJson();

        // Act
        List<User> users = serviceSpy.readUsersFromJson();

        // Assert
        assertTrue(users.isEmpty(), "Expected empty list when JSON is empty or missing.");
    }
}