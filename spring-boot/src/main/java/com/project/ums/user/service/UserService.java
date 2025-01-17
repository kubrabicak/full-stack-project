package com.project.ums.user.service;

import com.project.ums.user.model.User;
import com.project.ums.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Get All Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get User by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Update User
    public Optional<User> updateUser(Long id, User user) {
        if (userRepository.existsById(id)) {
            return Optional.of(userRepository.save(user));
        }
        return Optional.empty();
    }

    // Delete User
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}