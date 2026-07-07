package com.agriroute.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class CropYield {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long farmerId;
    private String cropType;
    private LocalDate plantingDate;
    private LocalDate expectedHarvestDate;
    
    // Simple log to track fertilizer applications
    private String fertilizerLog; 
}
