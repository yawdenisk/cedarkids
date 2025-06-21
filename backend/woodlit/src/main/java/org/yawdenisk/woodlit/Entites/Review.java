package org.yawdenisk.woodlit.Entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "reviews")
public class Review {
    @Id
    @UuidGenerator
    private UUID id;
    @Column(nullable = false)
    private String fullName;
    @Column(nullable = false, length = 1024)
    private String text;
    @Column(nullable = false)
    private int rate;
    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL)
    @Nullable
    private List<ReviewGallery> reviewGallery = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;
}
