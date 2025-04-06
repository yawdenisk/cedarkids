package org.yawdenisk.woodlit.Mappers;

import org.mapstruct.Mapper;

import org.mapstruct.Mapping;
import org.yawdenisk.woodlit.DTO.UserDetails;
import org.yawdenisk.woodlit.Entites.User;



@Mapper
public interface UserMapper {
    @Mapping(target = "deliveryDetails", ignore = true)
    @Mapping(target = "orders", ignore = true)
    User userDetailsToUser(UserDetails userDetails);
}
