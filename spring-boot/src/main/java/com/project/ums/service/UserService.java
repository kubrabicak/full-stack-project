package com.project.ums.service;

import com.project.ums.common.ApiResponse;
import com.project.ums.constants.MessageConstants;
import com.project.ums.model.User;
import com.project.ums.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public long getTotalUsersCount() {
        return userRepository.count();
    }

    // Create User
    public ApiResponse<User> createUser(User user) {
        User createdUser = userRepository.save(user);
        return new ApiResponse<>(MessageConstants.USER_CREATED, createdUser);
    }

    // Get All Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Update User
    public ApiResponse<User> updateUser(Long id, User user) {
        if (userRepository.existsById(id)) {
            userRepository.save(user);
            return new ApiResponse<>(MessageConstants.USER_UPDATED, user);
        } else {
            return new ApiResponse<>(MessageConstants.USER_NOT_FOUND, null);
        }
    }

    // Delete User
    public ApiResponse<Void> deleteUser(Long id) {
        boolean exists = userRepository.existsById(id);

        if (exists) {
            userRepository.deleteById(id);
            return new ApiResponse<>(MessageConstants.USER_DELETED, null);
        } else {
            return new ApiResponse<>(MessageConstants.USER_NOT_FOUND, null);
        }
    }
}