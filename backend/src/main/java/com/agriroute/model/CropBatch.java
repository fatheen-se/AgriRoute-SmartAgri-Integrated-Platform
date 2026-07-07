package com.agriroute.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CropBatch implements Comparable<CropBatch> {

    private String cropType;
    private double weightKg;
    private int shelfLifeDays; 
    private int marketDemandIndex; // 1 to 10 scale (higher is more demand)
    
    // Perishability score formula: lower shelfLife and higher demand = higher priority
    public double calculatePriorityWeight() {
        return (double) marketDemandIndex / Math.max(shelfLifeDays, 1);
    }

    @Override
    public int compareTo(CropBatch other) {
        // We want the HIGHEST priority weight to come first in the PriorityQueue
        return Double.compare(other.calculatePriorityWeight(), this.calculatePriorityWeight());
    }
}
