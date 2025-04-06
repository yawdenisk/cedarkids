package org.yawdenisk.woodlit.Services;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.yawdenisk.woodlit.DTO.UserDetails;
import org.yawdenisk.woodlit.DTO.UserRequest;
import org.yawdenisk.woodlit.Entites.User;
import org.yawdenisk.woodlit.Mappers.UserMapper;
import org.yawdenisk.woodlit.Repositories.UserRepository;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private KeycloakService keycloakService;

    public void createUser(UserRequest userRequest) throws JsonProcessingException {
        String tocken = "Bearer " + keycloakService.login(userRequest);
        UserDetails userDetails = keycloakService.getUserDetails(tocken);
        User user = userMapper.userDetailsToUser(userDetails);
        userRepository.save(user);
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }
}
