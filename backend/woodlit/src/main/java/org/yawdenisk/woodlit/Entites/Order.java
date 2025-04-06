package org.yawdenisk.woodlit.Entites;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @UuidGenerator
    private UUID id;
    @Column(nullable = false)
    private String status;
    @Column(nullable = false)
    private LocalDate date;
    @Column(nullable = false, length = 1024)
    private String paymentUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "order_cart_item",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "cart_item_id")
    )
    private List<CartItem> cart = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "delivery_details")
    private DeliveryDetails deliveryDetails;
}
