package com.agriroute.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MarketTrendService {

    // Returns a mock 7-day trend for specific markets
    public Map<String, Object> getMarketHeatmapData() {
        Map<String, Object> heatmap = new HashMap<>();

        // 7-day historical prices [Day1 ... Day7]
        heatmap.put("Dambulla", Map.of(
                "Tomatoes", List.of(120, 115, 110, 130, 140, 145, 150), // Trending Up (Hot)
                "Pumpkins", List.of(80, 75, 70, 70, 65, 60, 55)        // Trending Down (Cold - Oversupplied)
        ));

        heatmap.put("Colombo", Map.of(
                "Tomatoes", List.of(150, 155, 160, 165, 170, 175, 180), // Always high, steady
                "Pumpkins", List.of(90, 92, 95, 93, 90, 85, 88)
        ));

        heatmap.put("Nuwara Eliya", Map.of(
                "Carrots", List.of(200, 210, 205, 220, 230, 240, 250), // Hot
                "Leeks", List.of(100, 105, 100, 95, 90, 85, 80)        // Cold
        ));

        return heatmap;
    }
}
