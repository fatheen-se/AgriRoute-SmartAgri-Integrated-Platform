package com.agriroute.service;

import com.agriroute.model.CropYield;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SmartAgriService {

    // Simple Harvest Prediction based on crop type
    public LocalDate predictHarvestDate(CropYield cropYield) {
        if (cropYield.getPlantingDate() == null) {
            return null;
        }
        
        long daysToHarvest = 0;
        switch (cropYield.getCropType().toLowerCase()) {
            case "paddy":
                daysToHarvest = 120;
                break;
            case "tomatoes":
                daysToHarvest = 70;
                break;
            case "pumpkins":
                daysToHarvest = 100;
                break;
            case "carrots":
                daysToHarvest = 85;
                break;
            default:
                daysToHarvest = 90; // fallback
        }
        
        return cropYield.getPlantingDate().plusDays(daysToHarvest);
    }

    // Calculate Profit: Revenue (yield * market price) - Cost (fertilizer, seeds)
    public double calculateEstimatedProfit(double expectedYieldKg, double marketPricePerKg, double totalCosts) {
        double revenue = expectedYieldKg * marketPricePerKg;
        return revenue - totalCosts;
    }

    // Weather alert simulation
    public String checkWeatherAlerts(String region) {
        if (region.equalsIgnoreCase("Nuwara Eliya") || region.equalsIgnoreCase("Ratnapura")) {
            return "ALERT: Heavy monsoonal rains predicted. Risk of flooding and fungal diseases. Ensure proper drainage.";
        } else if (region.equalsIgnoreCase("Dambulla")) {
            return "WARNING: High temperature and dry spell. Increase irrigation frequency.";
        }
        return "Weather is optimal for farming in your region.";
    }
}
