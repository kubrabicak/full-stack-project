package com.project.ums.config;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;

import com.project.ums.service.UserService;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class GlobalCookie {

    public static final int EXPIRY = 24 * 60 * 60; // 1 day expiry

    private final UserService userService;

    @Autowired
    public GlobalCookie(UserService userService) {
        this.userService = userService;
    }

    @ModelAttribute
    public void addUserCountCookie(HttpServletResponse response) {
        // Get the total user count
        long totalUsers = userService.getTotalUsersCount();

        // Create and configure the cookie
        Cookie userCookie = new Cookie("RABO_USERS", String.valueOf(totalUsers));
        userCookie.setHttpOnly(false);
        userCookie.setPath("/");
        userCookie.setMaxAge(EXPIRY);

        // Add cookie to response
        response.addCookie(userCookie);
    }
}

