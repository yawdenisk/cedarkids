package org.yawdenisk.woodlit.Exceptions;

public class BlogNotFoundException extends CustomException {

    @Override
    public String getMessage() {
        return "Blog not found";
    }

    @Override
    public int getCode() {
        return 404;
    }

    @Override
    public String getDescription() {
        return "I couldn't find this blog";
    }
}
