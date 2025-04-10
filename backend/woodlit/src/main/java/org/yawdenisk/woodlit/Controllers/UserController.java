package org.yawdenisk.woodlit.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.yawdenisk.woodlit.DTO.UserDetails;
import org.yawdenisk.woodlit.DTO.UserRequest;
import org.yawdenisk.woodlit.Entites.User;
import org.yawdenisk.woodlit.Exceptions.UserNotFoundException;
import org.yawdenisk.woodlit.Services.KeycloakService;
import org.yawdenisk.woodlit.Services.UserService;


@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private KeycloakService keycloakService;
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserRequest userRequest) {
        try {
            String accessToken = keycloakService.login(userRequest);
            return ResponseEntity.ok().body(accessToken);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error logging in");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody UserRequest userRequest) {
        try {
            keycloakService.createUser(userRequest);
            userService.createUser(userRequest);
            return ResponseEntity.ok().body("User created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating user");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        try {
            keycloakService.logout(token);
            return ResponseEntity.ok().body("Logged out successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error logging out");
        }
    }

    @GetMapping("/getUserDetails")
    public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String token) {
        try {
            UserDetails userDetails = keycloakService.getUserDetails(token);
            User user = userService.findUserByEmail(userDetails.getEmail()).orElseThrow(UserNotFoundException::new);
            return ResponseEntity.ok().body(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error getting user details");
        }
    }
    @PutMapping("/update/")
    public ResponseEntity<?> update(@RequestBody UserRequest userRequest,
                                    @RequestHeader("Authorization") String token) {
        try{
            UserDetails userDetails = keycloakService.getUserDetails(token);
            User user = userService.findUserByEmail(userDetails.getEmail()).orElseThrow(UserNotFoundException::new);
            if(userRequest.getFirstName() != null) user.setFirstName(userRequest.getFirstName());
            if(userRequest.getLastName() != null) user.setLastName(userRequest.getLastName());
            userService.updateUser(user);
            return ResponseEntity.ok().body("User updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating user");
        }
    }
}
