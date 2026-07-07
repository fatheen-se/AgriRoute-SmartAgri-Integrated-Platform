package com.agriroute.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Edge {
    private String destination;
    private double distance; // Can be kilometers
    private int timeMinutes; // We'll use time as the primary weight for Dijkstra
}
