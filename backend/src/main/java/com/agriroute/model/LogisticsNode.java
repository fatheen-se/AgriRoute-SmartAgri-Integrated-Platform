package com.agriroute.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogisticsNode {
    // This is not an entity, just a model used for Dijkstra graph
    private String name;
    private double distance;
    private int avgTransitTimeMinutes;
}
