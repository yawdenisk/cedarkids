package org.yawdenisk.woodlit.Exceptions;

public class DeliveryDetailsNotFoundException extends CustomException {
    @Override
    public String getMessage() {
        return "Delivery details not found";
    }

    @Override
    public int getCode() {
        return 404;
    }

    @Override
    public String getDescription() {
        return "I couldn't find the delivery details you asked for";
    }
}
