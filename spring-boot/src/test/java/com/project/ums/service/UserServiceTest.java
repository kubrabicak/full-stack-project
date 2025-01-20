package com.project.ums.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.project.ums.common.ApiResponse;
import com.project.ums.constants.MessageConstants;
import com.project.ums.model.User;
import com.project.ums.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user;
    private final long userId = 1L;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(userId);
        user.setFullName("Harry Potter");
        user.setEmail("harryp@example.com");
    }

    @Test
    void shouldReturnTotalUsersCount() {
        // Arrange
        long expectedCount = 5L;
        when(userRepository.count()).thenReturn(expectedCount);

        // Act
        long actualCount = userService.getTotalUsersCount();

        // Assert
        assertEquals(expectedCount, actualCount);
        verify(userRepository).count();
    }

    @Test
    void shouldCreateUser() {
        // Arrange
        when(userRepository.save(any(User.class))).thenReturn(user);

        // Act
        ApiResponse<User> response = userService.createUser(user);

        // Assert
        assertNotNull(response, "The response should not be null.");
        assertEquals(MessageConstants.USER_CREATED, response.getMessage());
        assertEquals(user, response.getData());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void shouldReturnAllUsers() {
        // Arrange
        List<User> users = List.of(user);
        when(userRepository.findAll()).thenReturn(users);

        // Act
        List<User> allUsers = userService.getAllUsers();

        // Assert
        assertNotNull(allUsers, "The user list should not be null.");
        assertFalse(allUsers.isEmpty(), "The user list should not be empty.");
        assertEquals(1, allUsers.size());
        assertEquals(user, allUsers.getFirst());
        verify(userRepository).findAll();
    }

    @Test
    void shouldUpdateUser_whenUserExists() {
        // Arrange
        when(userRepository.existsById(userId)).thenReturn(true);
        when(userRepository.save(any(User.class))).thenReturn(user);

        // Act
        ApiResponse<User> response = userService.updateUser(userId, user);

        // Assert
        assertNotNull(response, "The response should not be null.");
        assertEquals(MessageConstants.USER_UPDATED, response.getMessage());
        assertEquals(user, response.getData());
        verify(userRepository).existsById(userId);
        verify(userRepository).save(any(User.class));
    }

    @Test
    void shouldReturnNotFound_whenUserToUpdateDoesNotExist() {
        // Arrange
        when(userRepository.existsById(userId)).thenReturn(false);

        // Act
        ApiResponse<User> response = userService.updateUser(userId, user);

        // Assert
        assertNotNull(response, "The response should not be null.");
        assertEquals(MessageConstants.USER_NOT_FOUND, response.getMessage());
        assertNull(response.getData(), "The response data should be null.");
        verify(userRepository).existsById(userId);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void shouldDeleteUser_whenUserExists() {
        // Arrange
        when(userRepository.existsById(userId)).thenReturn(true);

        // Act
        ApiResponse<Void> response = userService.deleteUser(userId);

        // Assert
        assertNotNull(response, "The response should not be null.");
        assertEquals(MessageConstants.USER_DELETED, response.getMessage());
        assertNull(response.getData(), "The response data should be null.");
        verify(userRepository).existsById(userId);
        verify(userRepository).deleteById(userId);
    }

    @Test
    void shouldReturnNotFound_whenUserToDeleteDoesNotExist() {
        // Arrange
        when(userRepository.existsById(userId)).thenReturn(false);

        // Act
        ApiResponse<Void> response = userService.deleteUser(userId);

        // Assert
        assertNotNull(response, "The response should not be null.");
        assertEquals(MessageConstants.USER_NOT_FOUND, response.getMessage());
        assertNull(response.getData(), "The response data should be null.");
        verify(userRepository).existsById(userId);
        verify(userRepository, never()).deleteById(userId);
    }
}
