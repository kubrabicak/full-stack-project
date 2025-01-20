package com.project.ums.user.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import com.project.ums.user.model.User;
import com.project.ums.user.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private User user;
    private final long userId = 1L;

    @BeforeEach
    void setUp() {
        // Initialize the User object
        user = new User();
        user.setId(userId);
        user.setFullName("Harry Potter");
        user.setEmail("harryp@example.com");
    }

    @Test
    void shouldCreateUser() {
        // Mock the service to return the created user
        when(userService.createUser(any(User.class))).thenReturn(user);

        // Call the controller method
        ResponseEntity<User> response = userController.createUser(user);

        // Assert the response
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(userId, response.getBody().getId());
        assertEquals("Harry Potter", response.getBody().getFullName());

        verify(userService).createUser(any(User.class));
    }

    @Test
    void shouldGetAllUsers() {
        // Mock the service to return a list of users and total count
        when(userService.getAllUsers()).thenReturn(List.of(user));
        when(userService.getTotalUsersCount()).thenReturn(1L);

        // Mock HttpServletResponse
        HttpServletResponse response = mock(HttpServletResponse.class);

        // Call the controller method
        ResponseEntity<List<User>> result = userController.getAllUsers(response);

        // Assert the response
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertNotNull(result.getBody());
        assertEquals(1, result.getBody().size());
        assertEquals(userId, result.getBody().getFirst().getId());

        // Verify interactions
        verify(userService).getAllUsers();
        verify(userService).getTotalUsersCount();
        verify(response).addCookie(argThat(cookie ->
                "RABO_USERS".equals(cookie.getName()) && "1".equals(cookie.getValue())
        ));
    }

    @Test
    void shouldUpdateUser() {
        // Mock the service to return the updated user
        when(userService.updateUser(eq(userId), any(User.class))).thenReturn(Optional.of(user));

        // Call the controller method
        ResponseEntity<User> response = userController.updateUser(userId, user);

        // Assert the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(userId, response.getBody().getId());
        assertEquals("Harry Potter", response.getBody().getFullName());

        verify(userService).updateUser(eq(userId), any(User.class));
    }

    @Test
    void shouldReturnNotFoundWhenUpdatingNonexistentUser() {
        // Mock the service to return an empty Optional
        when(userService.updateUser(eq(userId), any(User.class))).thenReturn(Optional.empty());

        // Call the controller method
        ResponseEntity<User> response = userController.updateUser(userId, user);

        // Assert the response
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());

        verify(userService).updateUser(eq(userId), any(User.class));
    }

    @Test
    void shouldDeleteUser() {
        // Mock the service to return true for deletion
        when(userService.deleteUser(userId)).thenReturn(true);

        // Call the controller method
        ResponseEntity<Void> response = userController.deleteUser(userId);

        // Assert the response
        assertEquals(HttpStatus.OK, response.getStatusCode());

        verify(userService).deleteUser(userId);
    }

    @Test
    void shouldReturnNotFoundWhenDeletingNonexistentUser() {
        // Mock the service to return false for deletion
        when(userService.deleteUser(userId)).thenReturn(false);

        // Call the controller method
        ResponseEntity<Void> response = userController.deleteUser(userId);

        // Assert the response
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());

        verify(userService).deleteUser(userId);
    }
}
