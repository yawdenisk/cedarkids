package org.yawdenisk.woodlit.Exceptions;

import lombok.Getter;

@Getter
public abstract class CustomException extends RuntimeException{
    private String message;
    private int code;
    private String description;
}
