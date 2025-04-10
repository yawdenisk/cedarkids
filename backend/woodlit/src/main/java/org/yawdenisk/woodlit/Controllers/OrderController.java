package org.yawdenisk.woodlit.Controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yawdenisk.woodlit.DTO.StripeResponse;
import org.yawdenisk.woodlit.DTO.UserRequest;
import org.yawdenisk.woodlit.Entites.Order;
import org.yawdenisk.woodlit.Entites.User;
import org.yawdenisk.woodlit.Exceptions.UserNotFoundException;
import org.yawdenisk.woodlit.PasswordGenerators.PasswordGenerator;
import org.yawdenisk.woodlit.Services.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private KeycloakService keycloakService;
    @Autowired
    private UserService userService;
    @Autowired
    private StripeService stripeService;
    @Autowired
    private PasswordGenerator passwordGenerator;

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            User user = userService.findUserByEmail(order.getUser().getEmail())
                    .orElseGet(() -> {
                        UserRequest userRequest = new UserRequest();
                        userRequest.setEmail(order.getUser().getEmail());
                        userRequest.setFirstName(order.getUser().getFirstName());
                        userRequest.setLastName(order.getUser().getLastName());
                        userRequest.setPassword(passwordGenerator.randomPass(8));
                        System.out.println(userRequest.getPassword());
                        try {
                            keycloakService.createUser(userRequest);
                        } catch (JsonProcessingException e) {
                            throw new RuntimeException(e);
                        }
                        try {
                            userService.createUser(userRequest);
                        } catch (JsonProcessingException e) {
                            throw new RuntimeException(e);
                        }
                        return userService.findUserByEmail(userRequest.getEmail())
                                .orElseThrow(UserNotFoundException::new);
                    });
            order.getDeliveryDetails().setUser(user);
            boolean deliveryExists = user.getDeliveryDetails().stream()
                    .anyMatch(existingDelivery -> existingDelivery.getPhone().equals(order.getDeliveryDetails().getPhone()) &&
                            existingDelivery.getAddress().equals(order.getDeliveryDetails().getAddress()) &&
                            existingDelivery.getCity().equals(order.getDeliveryDetails().getCity()) &&
                            existingDelivery.getPostalCode().equals(order.getDeliveryDetails().getPostalCode()));
            if (!deliveryExists) {
                user.getDeliveryDetails().add(order.getDeliveryDetails());
            }
            order.setUser(user);
            order.setStatus("UNPAID");
            order.setDate(LocalDate.now());
            StripeResponse stripeResponce = stripeService.checkoutProducts(order.getCart());
            order.setPaymentUrl(stripeResponce.getSessionUrl());
            orderService.createOrder(order);
            return ResponseEntity.ok().body(stripeResponce.getSessionUrl());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating order" + e.getMessage());
        }
    }

    @GetMapping("/getAllOrders")
    public ResponseEntity<?> getAllOrders(){
        try {
            return ResponseEntity.ok().body(orderService.getAllOrders());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error getting orders");
        }
    }
}
