# 🌾 AgriRoute & SmartAgri Integrated Platform

Welcome to the **AgriRoute & SmartAgri Integrated Platform**! This project serves as a comprehensive digital nervous system designed to revolutionize agriculture in Sri Lanka. By combining advanced predictive algorithms with an optimized logistics engine, this platform aims to drastically reduce post-harvest waste and maximize farmer profits.

---

## 🚀 Key Features

* **AgriRoute Logistics Optimizer:** Uses **Dijkstra’s Algorithm** mapped to Sri Lankan transport networks (Nuwara Eliya, Dambulla, Colombo) to calculate the absolute fastest route to market, ensuring perishables don't rot in transit.
* **Smart Perishable Priority Queue:** A custom data structure that automatically ranks harvested crops based on a dynamic "Perishability Score" (Shelf Life vs. Market Demand).
* **AgriShare Peer-to-Peer Hub:** A community-driven equipment pooling system where farmers can rent out idle tractors and harvesters to their neighbors.
* **Market Trend Heatmap:** Visualizes live 7-day price fluctuations across major Economic Centers using interactive charts to prevent market flooding and gluts.
* **AI-Ready Disease Diagnoser:** A rule-based expert system where farmers describe symptoms (e.g., "yellow spots on paddy") and receive instant treatment advice for local crop diseases.
* **Profit Ledger & Weather Alerts:** Calculates real-time net margins and flags severe weather warnings based on regional data.

---

## 🛠️ Technology Stack

**Backend (The "Antigravity" Engine)**
* **Java 17 & Spring Boot 3:** Provides a lightning-fast, highly concurrent REST API.
* **H2 Embedded Database / JPA:** Zero-setup relational database mapping for rapid prototyping.
* **Algorithms:** Dijkstra's Shortest Path Graph, Custom Comparators, Priority Queues.

**Frontend (Stunning UI)**
* **React & Vite:** A blazing-fast frontend framework.
* **Pure Vanilla CSS:** A completely custom, premium glassmorphic design system using dynamic CSS variables and fluid animations.

---

## 💻 How to Run Locally

### 1. Start the Backend API
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Run using Maven (or simply click `Run` in VS Code above the `AgriRouteApplication.java` main method):
   ```bash
   mvn spring-boot:run
   ```
*The backend will start on `http://localhost:8081`.*

### 2. Start the Frontend Dashboard
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (first time only):
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
*The stunning React UI will be available at `http://localhost:5173`.*

---

## 🌍 The Sri Lankan Context
Agriculture employs nearly a quarter of Sri Lanka's workforce. However, up to 40% of produce is lost post-harvest due to fragmented supply chains and a lack of data. This platform bridges that gap by connecting the farmer directly to the optimal logistics path, empowering them with data to feed the nation efficiently.
