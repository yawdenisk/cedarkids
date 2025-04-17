package org.yawdenisk.woodlit.Entites;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "review_gallery")
public class ReviewGallery {
    @Id
    @UuidGenerator
    private UUID id;
    @Column(nullable = false)
    private String ImageUrl;

    @ManyToOne
    @JoinColumn(name = "review_id")
    @JsonIgnore
    private Review review;
}
