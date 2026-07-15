import React, { useState } from 'react';

function DashboardOverview() {
  const [profitData, setProfitData] = useState(null);
  const [weatherAlert, setWeatherAlert] = useState(null);
  
  const [expectedYield, setExpectedYield] = useState(1000);
  const [marketPrice, setMarketPrice] = useState(150);
  const [costs, setCosts] = useState(50000);
  const [region, setRegion] = useState("Nuwara Eliya");

  const checkWeather = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/farmer/weather-alert?region=${region}`);
      const data = await res.json();
      setWeatherAlert(data.alert);
    } catch (e) {
      console.error(e);
    }
  };

  const calculateProfit = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/farmer/calculate-profit?expectedYieldKg=${expectedYield}&marketPricePerKg=${marketPrice}&totalCosts=${costs}`);
      const data = await res.json();
      setProfitData(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="glass-card">
      <h2>SmartAgri Overview</h2>
      
      <div className="form-group">
        <label>Farm Region</label>
        <div style={{display: 'flex', gap: '0.5rem'}}>
            <input type="text" className="form-control" value={region} onChange={(e) => setRegion(e.target.value)} />
            <button className="btn" onClick={checkWeather}>Check Alerts</button>
        </div>
      </div>
      
      {weatherAlert && (
        <div className={`alert ${weatherAlert.includes("ALERT") ? 'warning' : weatherAlert.includes("WARNING") ? 'warning' : 'success'}`}>
          {weatherAlert}
        </div>
      )}

      <h3 className="mt-1">Profit Ledger</h3>
      <div className="form-group" style={{display: 'flex', gap: '0.5rem'}}>
         <input type="number" className="form-control" placeholder="Yield (kg)" value={expectedYield} onChange={e => setExpectedYield(e.target.value)} />
         <input type="number" className="form-control" placeholder="Price/kg" value={marketPrice} onChange={e => setMarketPrice(e.target.value)} />
         <input type="number" className="form-control" placeholder="Costs" value={costs} onChange={e => setCosts(e.target.value)} />
      </div>
      <button className="btn" onClick={calculateProfit} style={{width: '100%'}}>Calculate Net Margin</button>
      
      {profitData && (
        <div className="mt-1" style={{background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '8px'}}>
           <div className="flex-between"><span>Revenue:</span> <strong>LKR {profitData.expectedRevenue.toLocaleString()}</strong></div>
           <div className="flex-between"><span>Costs:</span> <strong>LKR {profitData.totalCosts.toLocaleString()}</strong></div>
           <hr style={{borderColor: 'rgba(255,255,255,0.1)'}}/>
           <div className="flex-between" style={{color: profitData.estimatedProfit > 0 ? '#27ae60' : '#e74c3c'}}>
              <span>Net Profit:</span> <strong>LKR {profitData.estimatedProfit.toLocaleString()}</strong>
           </div>
        </div>
      )}
    </div>
  );
}

export default DashboardOverview;
