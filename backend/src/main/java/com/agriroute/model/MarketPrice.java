package com.agriroute.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class MarketPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String economicCenter; // e.g. Dambulla, Colombo
    private String cropType;
    private Double pricePerKg;
    private LocalDateTime lastUpdated;
}
