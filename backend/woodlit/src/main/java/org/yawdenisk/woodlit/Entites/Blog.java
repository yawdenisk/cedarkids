package org.yawdenisk.woodlit.Entites;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "blog")
@Entity
public class Blog {
    @Id
    @UuidGenerator
    private UUID id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String shortDescription;
    @Column(nullable = false, length = 10240)
    private String description;
    @Column(nullable = false)
    private String image;
}
