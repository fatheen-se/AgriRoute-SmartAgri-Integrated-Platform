package com.agriroute.service;

import com.agriroute.model.CropBatch;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

@Service
public class LogisticsService {

    private final PriorityQueue<CropBatch> harvestQueue = new PriorityQueue<>();

    public void addHarvestToQueue(CropBatch batch) {
        harvestQueue.add(batch);
    }

    public List<CropBatch> getPrioritizedQueue() {
        // Return a sorted list without emptying the actual queue for display purposes
        PriorityQueue<CropBatch> tempQueue = new PriorityQueue<>(harvestQueue);
        List<CropBatch> sortedList = new ArrayList<>();
        while (!tempQueue.isEmpty()) {
            sortedList.add(tempQueue.poll());
        }
        return sortedList;
    }

    public CropBatch processNextBatch() {
        return harvestQueue.poll();
    }
    
    public void populateMockData() {
        addHarvestToQueue(new CropBatch("Tomatoes", 500, 3, 9)); // High perishability, High demand
        addHarvestToQueue(new CropBatch("Pumpkins", 1000, 30, 4)); // Low perishability, Low demand
        addHarvestToQueue(new CropBatch("Carrots", 800, 7, 8));
        addHarvestToQueue(new CropBatch("Paddy", 5000, 180, 10)); // Staple, very long shelf life
    }
}
