package org.yawdenisk.woodlit.Exceptions;

public class UserNotFoundException extends CustomException{

    @Override
    public String getMessage() {
        return "User not found";
    }

    @Override
    public int getCode() {
        return 404;
    }

    @Override
    public String getDescription() {
        return "I couldn't find the user you asked for";
    }
}
