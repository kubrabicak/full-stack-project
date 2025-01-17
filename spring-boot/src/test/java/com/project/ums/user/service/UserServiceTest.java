package com.project.ums.user.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.project.ums.user.model.User;
import com.project.ums.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

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
        User createdUser = userService.createUser(user);

        // Assert
        assertNotNull(createdUser, "The created user should not be null.");
        assertEquals(user.getId(), createdUser.getId());
        assertEquals(user.getFullName(), createdUser.getFullName());
        assertEquals(user.getEmail(), createdUser.getEmail());
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
        assertNotNull(allUsers);
        assertFalse(allUsers.isEmpty(), "The user list should not be empty.");
        assertEquals(1, allUsers.size());
        verify(userRepository).findAll();
    }

    @Test
    void shouldReturnUserById_whenUserExists() {
        // Arrange
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // Act
        Optional<User> foundUser = userService.getUserById(userId);

        // Assert
        assertTrue(foundUser.isPresent(), "User should be found.");
        assertEquals(user, foundUser.get());
        verify(userRepository).findById(userId);
    }

    @Test
    void shouldReturnEmpty_whenUserNotFound() {
        // Arrange
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Act
        Optional<User> foundUser = userService.getUserById(userId);

        // Assert
        assertFalse(foundUser.isPresent(), "User should not be found.");
        verify(userRepository).findById(userId);
    }

    @Test
    void shouldUpdateUser_whenUserExists() {
        // Arrange
        when(userRepository.existsById(userId)).thenReturn(true);
        when(userRepository.save(any(User.class))).thenReturn(user);

        // Act
        Optional<User> updatedUser = userService.updateUser(userId, user);

        // Assert
        assertTrue(updatedUser.isPresent(), "Updated user should be present.");
        assertEquals(user, updatedUser.get());
        verify(userRepository).existsById(userId);
        verify(userRepository).save(any(User.class));
    }

    @Test
    void shouldReturnEmpty_whenUserToUpdateNotFound() {
        // Arrange
        when(userRepository.existsById(userId)).thenReturn(false);

        // Act
        Optional<User> updatedUser = userService.updateUser(userId, user);

        // Assert
        assertFalse(updatedUser.isPresent(), "Updated user should not be present.");
        verify(userRepository).existsById(userId);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void shouldDeleteUser_whenUserExists() {
        // Arrange
        when(userRepository.existsById(userId)).thenReturn(true);

        // Act
        boolean isDeleted = userService.deleteUser(userId);

        // Assert
        assertTrue(isDeleted, "User should be deleted.");
        verify(userRepository).existsById(userId);
        verify(userRepository).deleteById(userId);
    }

    @Test
    void shouldNotDeleteUser_whenUserDoesNotExist() {
        // Arrange
        when(userRepository.existsById(userId)).thenReturn(false);

        // Act
        boolean isDeleted = userService.deleteUser(userId);

        // Assert
        assertFalse(isDeleted, "User should not be deleted.");
        verify(userRepository).existsById(userId);
        verify(userRepository, never()).deleteById(userId);
    }
}
