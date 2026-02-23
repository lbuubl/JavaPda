package com.hanin.pda.common.util;

import org.springframework.http.HttpStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestResponse<T> {
    private Integer code;
    private HttpStatus httpStatus;
    private String message;
    private T data;
}

