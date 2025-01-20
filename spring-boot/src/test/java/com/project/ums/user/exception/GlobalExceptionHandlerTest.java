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

import com.project.ums.user.constants.ErrorConstants;

class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler globalExceptionHandler = new GlobalExceptionHandler();

    @Test
    void testHandleGenericException() {
        // Call the exception handler directly
        ResponseEntity<Map<String, String>> response = globalExceptionHandler.handleGenericException();

        // Validate the response
        assertNotNull(response, "ResponseEntity should not be null");
        assertNotNull(response.getBody(), "ResponseEntity body should not be null");
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(ErrorConstants.INTERNAL_SERVER_ERROR, response.getBody().get(ErrorConstants.ERROR));
        assertEquals(ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE, response.getBody().get(ErrorConstants.MESSAGE));
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
