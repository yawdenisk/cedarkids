package org.yawdenisk.woodlit.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yawdenisk.woodlit.Entites.DeliveryDetails;

import java.util.UUID;
@Repository
public interface DeliveryDetailsRepository extends JpaRepository<DeliveryDetails, UUID> {
}
