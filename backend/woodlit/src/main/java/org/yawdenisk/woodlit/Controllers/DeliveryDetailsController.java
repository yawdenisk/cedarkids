package org.yawdenisk.woodlit.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yawdenisk.woodlit.DTO.UserDetails;
import org.yawdenisk.woodlit.Entites.DeliveryDetails;
import org.yawdenisk.woodlit.Entites.User;
import org.yawdenisk.woodlit.Exceptions.DeliveryDetailsNotFoundException;
import org.yawdenisk.woodlit.Exceptions.UserNotFoundException;
import org.yawdenisk.woodlit.Services.DeliveryDetailsService;
import org.yawdenisk.woodlit.Services.KeycloakService;
import org.yawdenisk.woodlit.Services.UserService;

import java.util.UUID;

@RestController
@RequestMapping("/api/deliveryDetails")
public class DeliveryDetailsController {
    @Autowired
    private DeliveryDetailsService deliveryDetailsService;
    @Autowired
    private UserService userService;
    @Autowired
    private KeycloakService keycloakService;
    @PostMapping("/create")
    public ResponseEntity<String> createDeliveryDetails(@RequestBody DeliveryDetails deliveryDetails,
                                                        @RequestHeader("Authorization") String token){
        try{
            UserDetails userDetails = keycloakService.getUserDetails(token);
            User user = userService.findUserByEmail(userDetails.getEmail())
                    .orElseThrow(UserNotFoundException::new);
            deliveryDetails.setUser(user);
            deliveryDetailsService.create(deliveryDetails);
            return ResponseEntity.ok("Successfully created delivery details");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating delivery details");
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateDeliveryDetails(@RequestParam(name = "country", required = false) String country,
                                                        @RequestParam(name = "city", required = false) String city,
                                                        @RequestParam(name = "phone", required = false) String phone,
                                                        @RequestParam(name = "postalCode", required = false) String postalCode,
                                                        @RequestParam(name = "address", required = false) String address,
                                                        @PathVariable("id") UUID id) {
        try{
            DeliveryDetails deliveryDetails = deliveryDetailsService.get(id)
                    .orElseThrow(DeliveryDetailsNotFoundException::new);
            if(country != null) {deliveryDetails.setCountry(country);}
            if(city != null) {deliveryDetails.setCity(city);}
            if(phone != null) {deliveryDetails.setPhone(phone);}
            if(postalCode != null) {deliveryDetails.setPostalCode(postalCode);}
            if(address != null) {deliveryDetails.setAddress(address);}
            deliveryDetailsService.create(deliveryDetails);
            return ResponseEntity.ok("Successfully updated delivery details");
        }catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating delivery details");
        }
    }
}
