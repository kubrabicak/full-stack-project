package com.project.ums.user.exception;

import org.junit.jupiter.api.Test;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;

class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler globalExceptionHandler = new GlobalExceptionHandler();

    @Test
    void testHandleGenericException() {
        // Simulate a generic exception
        Exception ex = new Exception("Test generic exception");

        // Call the exception handler directly
        ResponseEntity<Map<String, String>> response = globalExceptionHandler.handleGenericException(ex);

        // Validate the response
        assertNotNull(response, "ResponseEntity should not be null");
        assertNotNull(response.getBody(), "ResponseEntity body should not be null");

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("INTERNAL_SERVER_ERROR", response.getBody().get("error"));
        assertEquals("Test generic exception", response.getBody().get("message"));
    }

    @Test
    void testHandleValidationException() {
        // Simulate validation errors
        BeanPropertyBindingResult bindingResult = new BeanPropertyBindingResult(new Object(), "testObject");
        bindingResult.addError(new FieldError("testObject", "field1", "Field1 must not be empty"));
        bindingResult.addError(new FieldError("testObject", "field2", "Field2 must be a valid value"));

        // Create a mock MethodParameter
        MethodParameter methodParameter = mock(MethodParameter.class);

        // Create a MethodArgumentNotValidException with the mock MethodParameter and binding result
        MethodArgumentNotValidException ex = new MethodArgumentNotValidException(methodParameter, bindingResult);

        // Call the exception handler directly
        ResponseEntity<Map<String, String>> response = globalExceptionHandler.handleValidationException(ex);

        // Validate the response
        assertNotNull(response, "ResponseEntity should not be null");
        assertNotNull(response.getBody(), "ResponseEntity body should not be null");

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("VALIDATION_ERROR", response.getBody().get("error"));
        assertEquals("Field1 must not be empty, Field2 must be a valid value", response.getBody().get("message"));
    }
}
