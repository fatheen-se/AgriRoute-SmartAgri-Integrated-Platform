package com.agriroute.service;

import com.agriroute.model.Edge;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.*;

@Service
public class RoutingService {

    // Graph represented as an adjacency list
    private final Map<String, List<Edge>> graph = new HashMap<>();

    @PostConstruct
    public void initMockData() {
        // Mocking Sri Lankan transport network
        addRoute("Nuwara Eliya", "Kandy", 80, 150);
        addRoute("Nuwara Eliya", "Badulla", 55, 120);
        addRoute("Kandy", "Kurunegala", 40, 90);
        addRoute("Kandy", "Colombo", 115, 200);
        addRoute("Dambulla", "Kurunegala", 55, 90);
        addRoute("Dambulla", "Kandy", 72, 120);
        addRoute("Kurunegala", "Colombo", 95, 150);
        addRoute("Badulla", "Ratnapura", 140, 240);
        addRoute("Ratnapura", "Colombo", 100, 160);
    }

    private void addRoute(String source, String dest, double distance, int timeMinutes) {
        graph.computeIfAbsent(source, k -> new ArrayList<>()).add(new Edge(dest, distance, timeMinutes));
        graph.computeIfAbsent(dest, k -> new ArrayList<>()).add(new Edge(source, distance, timeMinutes)); // Undirected graph
    }

    public static class RouteResult {
        public List<String> path;
        public int totalTimeMinutes;

        public RouteResult(List<String> path, int totalTimeMinutes) {
            this.path = path;
            this.totalTimeMinutes = totalTimeMinutes;
        }
    }

    public RouteResult findFastestRoute(String start, String end) {
        if (!graph.containsKey(start) || !graph.containsKey(end)) {
            return new RouteResult(Collections.emptyList(), 0);
        }

        PriorityQueue<NodeDistance> pq = new PriorityQueue<>(Comparator.comparingInt(nd -> nd.distance));
        Map<String, Integer> distances = new HashMap<>();
        Map<String, String> previous = new HashMap<>();

        for (String vertex : graph.keySet()) {
            distances.put(vertex, Integer.MAX_VALUE);
        }

        distances.put(start, 0);
        pq.add(new NodeDistance(start, 0));

        while (!pq.isEmpty()) {
            NodeDistance current = pq.poll();
            String u = current.node;

            if (u.equals(end)) break;
            
            if (current.distance > distances.get(u)) continue;

            for (Edge edge : graph.getOrDefault(u, new ArrayList<>())) {
                String v = edge.getDestination();
                int alt = distances.get(u) + edge.getTimeMinutes();
                
                if (alt < distances.get(v)) {
                    distances.put(v, alt);
                    previous.put(v, u);
                    pq.add(new NodeDistance(v, alt));
                }
            }
        }

        List<String> path = new ArrayList<>();
        String curr = end;
        if (previous.containsKey(curr) || curr.equals(start)) {
            while (curr != null) {
                path.add(0, curr);
                curr = previous.get(curr);
            }
        }

        return new RouteResult(path, distances.get(end));
    }

    private static class NodeDistance {
        String node;
        int distance;

        NodeDistance(String node, int distance) {
            this.node = node;
            this.distance = distance;
        }
    }
}
