package com.agriroute.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Farmer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String region;
    private Double landSize; // in hectares
}
