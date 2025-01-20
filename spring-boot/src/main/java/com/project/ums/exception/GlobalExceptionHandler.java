package com.project.ums.exception;

import com.project.ums.constants.MessageConstants;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static com.project.ums.constants.MessageConstants.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handle general exceptions (fallback for unhandled exceptions)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException() {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put(ERROR, MessageConstants.INTERNAL_SERVER_ERROR);
        errorResponse.put(MESSAGE, MessageConstants.INTERNAL_SERVER_ERROR_MESSAGE);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }

    // Handle validation exceptions (method argument not valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put(ERROR, VALIDATION_ERROR);

        // All validation error messages into a single string
        String combinedMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(FieldError::getDefaultMessage) // Only include the error messages
                .collect(Collectors.joining(", "));

        errorResponse.put(MESSAGE, combinedMessage);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }
}
