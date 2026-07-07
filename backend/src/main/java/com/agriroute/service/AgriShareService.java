package com.agriroute.service;

import com.agriroute.model.Equipment;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AgriShareService {

    private final List<Equipment> equipmentPool = new ArrayList<>();

    @PostConstruct
    public void initData() {
        equipmentPool.add(new Equipment(UUID.randomUUID().toString(), "Mahindra 575 DI Tractor", "Sunil P.", "Kurunegala", 1200.0, true, "Tractor"));
        equipmentPool.add(new Equipment(UUID.randomUUID().toString(), "Honda High-Pressure Water Pump", "Kamal R.", "Dambulla", 450.0, true, "Pump"));
        equipmentPool.add(new Equipment(UUID.randomUUID().toString(), "Kubota Combine Harvester", "Nimal S.", "Anuradhapura", 3500.0, false, "Harvester"));
        equipmentPool.add(new Equipment(UUID.randomUUID().toString(), "Massey Ferguson 241", "Perera Farms", "Nuwara Eliya", 1300.0, true, "Tractor"));
    }

    public List<Equipment> getAllEquipment() {
        return equipmentPool;
    }

    public List<Equipment> getAvailableEquipment() {
        return equipmentPool.stream().filter(Equipment::isAvailable).collect(Collectors.toList());
    }

    public Equipment rentEquipment(String id) {
        for (Equipment eq : equipmentPool) {
            if (eq.getId().equals(id) && eq.isAvailable()) {
                eq.setAvailable(false);
                return eq;
            }
        }
        return null;
    }
}
