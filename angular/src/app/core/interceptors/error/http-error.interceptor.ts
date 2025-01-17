import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorHandlingService } from "../../services/error-handling.service";

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandlingService = inject(ErrorHandlingService); // Centralized service for error handling

  return next(req).pipe(
    // Handle errors
    catchError((error: HttpErrorResponse) => {
      let errorMessage: string;

      switch (error.status) {
        case 400: // Bad Request
          if (error.error?.error === 'VALIDATION_ERROR') {
            errorMessage = error.error.message || 'Validation failed. Please check your input.';
          } else {
            errorMessage = 'Bad request. Please check your data and try again.';
          }
          break;
        case 401: // Unauthorized
          errorMessage = 'You are not authorized to perform this action. Please log in.';
          break;
        case 403: // Forbidden
          errorMessage = 'You do not have permission to access this resource.';
          break;
        case 404: // Not Found
          errorMessage = 'The requested resource was not found.';
          break;
        case 500: // Internal Server Error
          errorMessage = 'A server error occurred. Please try again later.';
          break;
        case 503: // Service Unavailable
          errorMessage = 'The service is temporarily unavailable. Please try again later.';
          break;
        default: // Other unhandled errors
          errorMessage = 'An unexpected error occurred. Please try again later.';
          break;
      }

      // Use the centralized service to show error messages
      errorHandlingService.handleError(errorMessage);

      console.error('HTTP Error:', error);

      return throwError(() => error);
    })
  );
};
