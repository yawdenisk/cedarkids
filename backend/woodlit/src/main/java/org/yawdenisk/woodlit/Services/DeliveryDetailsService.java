package org.yawdenisk.woodlit.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.yawdenisk.woodlit.Entites.DeliveryDetails;
import org.yawdenisk.woodlit.Repositories.DeliveryDetailsRepository;

import java.util.Optional;
import java.util.UUID;

@Service
public class DeliveryDetailsService {
    @Autowired
    private DeliveryDetailsRepository deliveryDetailsRepository;

    public void create(DeliveryDetails deliveryDetails) {
        deliveryDetailsRepository.save(deliveryDetails);
    }

    public Optional<DeliveryDetails> get(UUID id) {
        return deliveryDetailsRepository.findById(id);
    }
}
