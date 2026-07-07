package com.agriroute.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class DiseaseService {

    // Simple Rule-Based Expert System for local crop diseases
    public Map<String, String> diagnose(String symptoms) {
        String lowerSymptoms = symptoms.toLowerCase();
        Map<String, String> result = new HashMap<>();

        if (lowerSymptoms.contains("yellow spots") && lowerSymptoms.contains("paddy")) {
            result.put("disease", "Paddy Blast");
            result.put("treatment", "Apply Tricyclazole or validamycin. Reduce nitrogen fertilizer.");
            result.put("confidence", "85%");
        } else if (lowerSymptoms.contains("wilted stems") || lowerSymptoms.contains("water-soaked")) {
            result.put("disease", "Bacterial Leaf Blight");
            result.put("treatment", "Use copper-based bactericides. Improve field drainage.");
            result.put("confidence", "75%");
        } else if (lowerSymptoms.contains("white powdery") || lowerSymptoms.contains("fungus")) {
            result.put("disease", "Powdery Mildew");
            result.put("treatment", "Apply sulfur-based fungicides. Increase spacing between plants.");
            result.put("confidence", "80%");
        } else {
            result.put("disease", "Unknown / Requires Visual Inspection");
            result.put("treatment", "Please consult a local agricultural extension officer.");
            result.put("confidence", "N/A");
        }

        return result;
    }
}
