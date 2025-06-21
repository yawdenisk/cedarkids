package org.yawdenisk.woodlit.Services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.yawdenisk.woodlit.DTO.StripeResponse;
import org.yawdenisk.woodlit.Entites.CartItem;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class StripeService {
    @Value("${stripe.secret}")
    private String stripeSecret;

    public StripeResponse checkoutProducts(List<CartItem> cart) {
        Stripe.apiKey = stripeSecret;
        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();
        for (CartItem cartItem : cart) {
            SessionCreateParams.LineItem.PriceData.ProductData productData =
                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                            .setName(cartItem.getProduct().getName())
                            .build();

            SessionCreateParams.LineItem.PriceData priceData =
                    SessionCreateParams.LineItem.PriceData.builder()
                            .setUnitAmount(BigDecimal.valueOf(cartItem.getProduct().getPrice()).setScale(2, BigDecimal.ROUND_HALF_UP).multiply(BigDecimal.valueOf(100)).longValueExact())
                            .setProductData(productData)
                            .setCurrency("EUR")
                            .build();
            lineItems.add(
                    SessionCreateParams.LineItem.builder()
                            .setQuantity(cartItem.getQuantity())
                            .setPriceData(priceData)
                            .build());
        }
        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:3000" + "?success=true")
                        .setCancelUrl("http://localhost:3000" + "?canceled=true")
                        .addAllLineItem(lineItems)
                        .build();
        Session session = null;
        try {
            session = Session.create(params);
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
        return StripeResponse.builder()
                .status("SUCCESS")
                .message("Payment session created successfully")
                .sessionId(session.getId())
                .sessionUrl(session.getUrl())
                .build();
    }
}