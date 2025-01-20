package com.project.ums.config;

import com.project.ums.service.UserService;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletResponse;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GlobalCookieTest {

    @InjectMocks
    private GlobalCookie globalCookie;

    @Mock
    private UserService userService;

    @Test
    void testAddUserCountCookie() {
        // Arrange
        MockHttpServletResponse response = new MockHttpServletResponse();
        long expectedUserCount = 100L;
        when(userService.getTotalUsersCount()).thenReturn(expectedUserCount);

        // Act
        globalCookie.addUserCountCookie(response);

        // Assert
        Cookie[] cookies = response.getCookies();
        assertEquals(1, cookies.length);
        assertEquals("RABO_USERS", cookies[0].getName());
        assertEquals(String.valueOf(expectedUserCount), cookies[0].getValue());
        assertEquals("/", cookies[0].getPath());
        assertEquals(24 * 60 * 60, cookies[0].getMaxAge());
    }
}