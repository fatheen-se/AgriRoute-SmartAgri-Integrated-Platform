package com.agriroute.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Equipment {
    private String id;
    private String name;
    private String owner;
    private String location;
    private double hourlyRate;
    private boolean isAvailable;
    private String type; // e.g. "Tractor", "Harvester", "Water Pump"
}
