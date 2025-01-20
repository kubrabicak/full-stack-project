package com.project.ums.controller;

import com.project.ums.common.ApiResponse;
import com.project.ums.constants.MessageConstants;
import com.project.ums.model.User;
import com.project.ums.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Create User
    @PostMapping
    public ResponseEntity<ApiResponse<User>> createUser(@Valid @RequestBody User user) {
        ApiResponse<User> response = userService.createUser(user);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get All Users
    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        ApiResponse<List<User>> response = new ApiResponse<>(MessageConstants.USERS_FETCHED, users);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Update User
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        ApiResponse<User> response = userService.updateUser(id, user);
        HttpStatus status = response.getMessage().equals(MessageConstants.USER_UPDATED) ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        return new ResponseEntity<>(response, status);
    }

    // Delete User
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        ApiResponse<Void> response = userService.deleteUser(id);
        HttpStatus status = response.getMessage().equals(MessageConstants.USER_DELETED) ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        return new ResponseEntity<>(response, status);
    }
}
