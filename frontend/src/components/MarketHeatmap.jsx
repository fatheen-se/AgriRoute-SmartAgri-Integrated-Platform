import React, { useEffect, useState } from 'react';

function MarketHeatmap() {
  const [trends, setTrends] = useState(null);

  const fetchTrends = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/market/trends');
      const data = await res.json();
      setTrends(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  if (!trends) return <div className="glass-card">Loading Market Trends...</div>;

  return (
    <div className="glass-card" style={{gridColumn: '1 / -1'}}>
      <div>
        <h2>Market Trend Heatmap</h2>
        <p style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginTop: '-0.5rem'}}>Live Demand & 7-Day Price Trends across Economic Centers</p>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem'}}>
        {Object.entries(trends).map(([market, crops]) => (
           <div key={market} style={{background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '12px'}}>
             <h3 style={{marginBottom: '1rem', color: 'var(--secondary)'}}>{market} Economic Center</h3>
             <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
               {Object.entries(crops).map(([crop, prices]) => {
                  const currentPrice = prices[prices.length - 1];
                  const oldPrice = prices[0];
                  const isHot = currentPrice > oldPrice;
                  const diff = Math.round(((currentPrice - oldPrice) / oldPrice) * 100);
                  
                  return (
                    <div key={crop} style={{
                      flex: 1, minWidth: '200px',
                      background: 'rgba(255,255,255,0.05)',
                      borderLeft: `4px solid ${isHot ? '#e74c3c' : '#3498db'}`,
                      padding: '1rem',
                      borderRadius: '8px'
                    }}>
                       <div className="flex-between">
                         <strong>{crop}</strong>
                         <span className="badge" style={{background: isHot ? '#e74c3c' : '#3498db'}}>{isHot ? '🔥 HOT' : '❄️ COLD'}</span>
                       </div>
                       <div style={{fontSize: '1.8rem', fontWeight: 'bold', margin: '0.5rem 0'}}>
                         LKR {currentPrice} <span style={{fontSize: '0.9rem', color: isHot ? '#e74c3c' : '#3498db'}}>{isHot ? '▲' : '▼'} {Math.abs(diff)}%</span>
                       </div>
                       <div style={{display: 'flex', alignItems: 'flex-end', height: '40px', gap: '2px'}}>
                         {prices.map((p, i) => (
                            <div key={i} title={`LKR ${p}`} style={{
                               flex: 1, 
                               background: isHot ? 'rgba(231, 76, 60, 0.6)' : 'rgba(52, 152, 219, 0.6)',
                               height: `${(p / Math.max(...prices)) * 100}%`,
                               borderRadius: '2px 2px 0 0'
                            }}></div>
                         ))}
                       </div>
                       <div style={{fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: '4px'}}>7-Day Trend</div>
                    </div>
                  );
               })}
             </div>
           </div>
        ))}
      </div>
    </div>
  );
}

export default MarketHeatmap;
