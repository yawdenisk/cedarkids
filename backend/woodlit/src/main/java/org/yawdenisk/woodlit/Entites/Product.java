package org.yawdenisk.woodlit.Entites;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "products")
public class Product {
    @Id
    @UuidGenerator
    private UUID id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String image;
    @Column(nullable = false, length = 1024)
    private String description;
    @Column(nullable = false)
    private Float price;
    @Column(nullable = false, length = 1024)
    private String features;
    @Column(nullable = false)
    private Float lastPrice;
    @Column(nullable = false)
    private Float installationPrice;
    @Column(nullable = false)
    private String demensions;
    @Column(nullable = false)
    private String construction;

    @OneToMany(mappedBy = "product")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductGallery> gallery = new ArrayList<>();
}
