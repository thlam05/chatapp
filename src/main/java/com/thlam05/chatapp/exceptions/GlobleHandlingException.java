package com.thlam05.chatapp.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.enums.ResponseCode;

@ControllerAdvice
public class GlobleHandlingException {
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse<Void>> handlingAppException(AppException exception) {
        ResponseCode code = exception.getCode();
        ApiResponse<Void> apiResponse = new ApiResponse<>(null);

        apiResponse.setCode(code.getCode());
        apiResponse.setMessage(code.getMessage());

        boolean success = false;
        if (code.getCode() == 0) {
            success = true;
        }
        apiResponse.setSuccess(success);

        return ResponseEntity.status(code.getStatus()).body(apiResponse);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse<Void>> handlingMethodArgumentNotValidException(
            MethodArgumentNotValidException exception) {
        ResponseCode code = ResponseCode.BAD_LOGIN_REQUEST;
        ApiResponse<Void> apiResponse = new ApiResponse<>(null);

        apiResponse.setCode(code.getCode());
        apiResponse.setMessage(exception.getBindingResult()
                .getFieldError()
                .getDefaultMessage());

        boolean success = false;
        if (code.getCode() == 0) {
            success = true;
        }
        apiResponse.setSuccess(success);

        return ResponseEntity.status(code.getStatus()).body(apiResponse);
    }

    @ExceptionHandler(value = NoResourceFoundException.class)
    ResponseEntity<ApiResponse<Void>> handlingNoHandlerFoundException(NoResourceFoundException exception) {
        ResponseCode code = ResponseCode.NOT_FOUND;
        ApiResponse<Void> apiResponse = new ApiResponse<>(null);

        apiResponse.setCode(code.getCode());
        apiResponse.setMessage(code.getMessage() + " endpoint");

        boolean success = false;
        if (code.getCode() == 0) {
            success = true;
        }
        apiResponse.setSuccess(success);

        return ResponseEntity.status(code.getStatus()).body(apiResponse);
    }
}
