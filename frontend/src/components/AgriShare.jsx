import React, { useEffect, useState } from 'react';

function AgriShare() {
  const [equipment, setEquipment] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchEquipment = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/agrishare/equipment');
      const data = await res.json();
      setEquipment(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const handleRent = async (id) => {
    setLoadingId(id);
    try {
      await fetch(`http://localhost:8081/api/agrishare/rent/${id}`, { method: 'POST' });
      // Re-fetch to update availability
      fetchEquipment();
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="glass-card" style={{gridColumn: '1 / -1'}}>
      <div className="flex-between mb-1">
        <div>
          <h2>AgriShare Hub</h2>
          <p style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginTop: '-0.5rem'}}>Peer-to-Peer Equipment Pooling</p>
        </div>
        <button className="btn" style={{background: 'var(--secondary)'}} onClick={fetchEquipment}>Refresh List</button>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
        {equipment.map(eq => (
          <div key={eq.id} style={{
             background: 'rgba(255,255,255,0.05)', 
             padding: '1.5rem', 
             borderRadius: '12px',
             border: '1px solid var(--border-color)',
             display: 'flex', flexDirection: 'column', gap: '0.5rem'
          }}>
            <div className="flex-between">
               <strong style={{fontSize: '1.1rem'}}>{eq.name}</strong>
               <span className="badge" style={{background: eq.available ? '#27ae60' : '#e74c3c'}}>{eq.available ? 'Available' : 'Rented'}</span>
            </div>
            <div style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)'}}>
              <div>📍 {eq.location}</div>
              <div>👤 Owner: {eq.owner}</div>
            </div>
            <div style={{fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--secondary)', margin: '0.5rem 0'}}>
               LKR {eq.hourlyRate} / hr
            </div>
            <button 
              className="btn" 
              style={{width: '100%', opacity: eq.available ? 1 : 0.5, cursor: eq.available ? 'pointer' : 'not-allowed'}}
              disabled={!eq.available || loadingId === eq.id}
              onClick={() => handleRent(eq.id)}
            >
              {loadingId === eq.id ? 'Processing...' : (eq.available ? 'Rent Now' : 'Unavailable')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgriShare;
