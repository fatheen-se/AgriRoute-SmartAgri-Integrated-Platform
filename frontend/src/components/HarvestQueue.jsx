import React, { useEffect, useState } from 'react';

function HarvestQueue() {
  const [queue, setQueue] = useState([]);

  const fetchQueue = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/logistics/harvest-queue');
      const data = await res.json();
      setQueue(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  return (
    <div className="glass-card">
      <div className="flex-between">
         <h2>Perishable Priority Queue</h2>
         <button className="btn" style={{padding: '0.4rem 0.8rem', fontSize: '0.8rem'}} onClick={fetchQueue}>Refresh</button>
      </div>
      <p style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem'}}>Dynamically sorted by shelf-life & market demand.</p>

      <ul className="queue-list">
        {queue.map((item, index) => {
           // Calculate a mock priority score visually based on position
           const isHighPriority = index === 0;
           return (
             <li key={index} className="queue-item" style={isHighPriority ? { borderLeft: '4px solid #e74c3c', background: 'rgba(231, 76, 60, 0.1)'} : {}}>
               <div>
                 <strong>{item.cropType}</strong>
                 <div style={{fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)'}}>
                    {item.weightKg} kg | Demand: {item.marketDemandIndex}/10 | Shelf Life: {item.shelfLifeDays} days
                 </div>
               </div>
               <div style={{display: 'flex', alignItems: 'center'}}>
                 {isHighPriority && <span className="badge" style={{background: '#e74c3c'}}>Dispatch Now</span>}
                 {!isHighPriority && <span className="badge" style={{background: 'rgba(255,255,255,0.2)'}}>#{index + 1}</span>}
               </div>
             </li>
           );
        })}
      </ul>
    </div>
  );
}

export default HarvestQueue;
