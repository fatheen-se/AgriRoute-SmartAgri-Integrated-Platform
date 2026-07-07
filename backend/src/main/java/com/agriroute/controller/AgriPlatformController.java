package com.agriroute.controller;

import com.agriroute.model.CropBatch;
import com.agriroute.model.CropYield;
import com.agriroute.service.DiseaseService;
import com.agriroute.service.LogisticsService;
import com.agriroute.service.RoutingService;
import com.agriroute.service.SmartAgriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // For development
public class AgriPlatformController {

    @Autowired
    private RoutingService routingService;

    @Autowired
    private LogisticsService logisticsService;

    @Autowired
    private DiseaseService diseaseService;

    @Autowired
    private SmartAgriService smartAgriService;

    @PostConstruct
    public void init() {
        logisticsService.populateMockData();
    }

    // --- LOGISTICS ---

    @GetMapping("/logistics/optimize-route")
    public RoutingService.RouteResult optimizeRoute(@RequestParam String from, @RequestParam String to) {
        return routingService.findFastestRoute(from, to);
    }

    @GetMapping("/logistics/harvest-queue")
    public List<CropBatch> getHarvestQueue() {
        return logisticsService.getPrioritizedQueue();
    }

    // --- DISEASE DETECTION ---

    @PostMapping("/disease/diagnose")
    public Map<String, String> diagnoseDisease(@RequestBody Map<String, String> payload) {
        String symptoms = payload.getOrDefault("symptoms", "");
        return diseaseService.diagnose(symptoms);
    }

    // --- SMART AGRI ---

    @PostMapping("/farmer/predict-harvest")
    public Map<String, Object> predictHarvest(@RequestBody CropYield yield) {
        // Just mocking the ID for the response if not set
        if (yield.getPlantingDate() == null) {
            yield.setPlantingDate(LocalDate.now());
        }
        LocalDate harvestDate = smartAgriService.predictHarvestDate(yield);
        return Map.of(
            "cropType", yield.getCropType(),
            "plantingDate", yield.getPlantingDate(),
            "expectedHarvestDate", harvestDate != null ? harvestDate : "Unknown"
        );
    }

    @GetMapping("/farmer/weather-alert")
    public Map<String, String> getWeatherAlert(@RequestParam String region) {
        return Map.of("region", region, "alert", smartAgriService.checkWeatherAlerts(region));
    }
    
    @GetMapping("/farmer/calculate-profit")
    public Map<String, Object> calculateProfit(
            @RequestParam double expectedYieldKg, 
            @RequestParam double marketPricePerKg, 
            @RequestParam double totalCosts) {
        double profit = smartAgriService.calculateEstimatedProfit(expectedYieldKg, marketPricePerKg, totalCosts);
        return Map.of(
            "expectedRevenue", expectedYieldKg * marketPricePerKg,
            "totalCosts", totalCosts,
            "estimatedProfit", profit
        );
    }

    // --- AGRISHARE ---
    
    @Autowired
    private com.agriroute.service.AgriShareService agriShareService;

    @GetMapping("/agrishare/equipment")
    public List<com.agriroute.model.Equipment> getEquipment() {
        return agriShareService.getAllEquipment();
    }

    @PostMapping("/agrishare/rent/{id}")
    public com.agriroute.model.Equipment rentEquipment(@PathVariable String id) {
        return agriShareService.rentEquipment(id);
    }

    // --- MARKET TRENDS ---

    @Autowired
    private com.agriroute.service.MarketTrendService marketTrendService;

    @GetMapping("/market/trends")
    public Map<String, Object> getMarketTrends() {
        return marketTrendService.getMarketHeatmapData();
    }
}
