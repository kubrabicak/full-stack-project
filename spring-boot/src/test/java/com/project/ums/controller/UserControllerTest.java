package com.project.ums.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import com.project.ums.common.ApiResponse;
import com.project.ums.constants.MessageConstants;
import com.project.ums.model.User;
import com.project.ums.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

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
        // Mock the service to return a response
        ApiResponse<User> apiResponse = new ApiResponse<>(MessageConstants.USER_CREATED, user);
        when(userService.createUser(any(User.class))).thenReturn(apiResponse);

        // Call the controller method
        ResponseEntity<ApiResponse<User>> response = userController.createUser(user);

        // Assert the response
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(MessageConstants.USER_CREATED, response.getBody().getMessage());
        assertEquals(user, response.getBody().getData());

        verify(userService).createUser(any(User.class));
    }

    @Test
    void shouldGetAllUsers() {
        // Mock the service to return a list of users
        List<User> users = List.of(user);
        when(userService.getAllUsers()).thenReturn(users);

        // Call the controller method
        ResponseEntity<ApiResponse<List<User>>> response = userController.getAllUsers();

        // Assert the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(MessageConstants.USERS_FETCHED, response.getBody().getMessage());
        assertEquals(users, response.getBody().getData());

        verify(userService).getAllUsers();
    }

    @Test
    void shouldUpdateUser() {
        // Mock the service to return the updated user
        ApiResponse<User> apiResponse = new ApiResponse<>(MessageConstants.USER_UPDATED, user);
        when(userService.updateUser(eq(userId), any(User.class))).thenReturn(apiResponse);

        // Call the controller method
        ResponseEntity<ApiResponse<User>> response = userController.updateUser(userId, user);

        // Assert the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(MessageConstants.USER_UPDATED, response.getBody().getMessage());
        assertEquals(user, response.getBody().getData());

        verify(userService).updateUser(eq(userId), any(User.class));
    }

    @Test
    void shouldReturnNotFoundWhenUpdatingNonexistentUser() {
        // Mock the service to return an error response
        ApiResponse<User> apiResponse = new ApiResponse<>(MessageConstants.USER_NOT_FOUND, null);
        when(userService.updateUser(eq(userId), any(User.class))).thenReturn(apiResponse);

        // Call the controller method
        ResponseEntity<ApiResponse<User>> response = userController.updateUser(userId, user);

        // Assert the response
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(MessageConstants.USER_NOT_FOUND, response.getBody().getMessage());
        assertNull(response.getBody().getData());

        verify(userService).updateUser(eq(userId), any(User.class));
    }

    @Test
    void shouldDeleteUser() {
        // Mock the service to return a success response
        ApiResponse<Void> apiResponse = new ApiResponse<>(MessageConstants.USER_DELETED, null);
        when(userService.deleteUser(userId)).thenReturn(apiResponse);

        // Call the controller method
        ResponseEntity<ApiResponse<Void>> response = userController.deleteUser(userId);

        // Assert the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(MessageConstants.USER_DELETED, response.getBody().getMessage());
        assertNull(response.getBody().getData());

        verify(userService).deleteUser(userId);
    }

    @Test
    void shouldReturnNotFoundWhenDeletingNonexistentUser() {
        // Mock the service to return an error response
        ApiResponse<Void> apiResponse = new ApiResponse<>(MessageConstants.USER_NOT_FOUND, null);
        when(userService.deleteUser(userId)).thenReturn(apiResponse);

        // Call the controller method
        ResponseEntity<ApiResponse<Void>> response = userController.deleteUser(userId);

        // Assert the response
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(MessageConstants.USER_NOT_FOUND, response.getBody().getMessage());
        assertNull(response.getBody().getData());

        verify(userService).deleteUser(userId);
    }
}