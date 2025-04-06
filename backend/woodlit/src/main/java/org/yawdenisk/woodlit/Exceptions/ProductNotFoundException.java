package org.yawdenisk.woodlit.Exceptions;

public class ProductNotFoundException extends CustomException {
    @Override
    public String getMessage() {
        return "Product not found";
    }

    @Override
    public int getCode() {
        return 404;
    }

    @Override
    public String getDescription() {
        return "I couldn't find the product you asked for";
    }
}
