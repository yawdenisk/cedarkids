package org.yawdenisk.woodlit.Mappers;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import org.yawdenisk.woodlit.DTO.UserDetails;
import org.yawdenisk.woodlit.Entites.User;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-03-18T21:56:04+0100",
    comments = "version: 1.6.2, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User userDetailsToUser(UserDetails userDetails) {
        if ( userDetails == null ) {
            return null;
        }

        User user = new User();

        user.setId( userDetails.getId() );
        user.setEmail( userDetails.getEmail() );
        user.setFirstName( userDetails.getFirstName() );
        user.setLastName( userDetails.getLastName() );

        return user;
    }
}
