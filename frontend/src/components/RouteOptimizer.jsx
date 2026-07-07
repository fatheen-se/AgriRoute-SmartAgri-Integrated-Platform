import React, { useState } from 'react';

function RouteOptimizer() {
  const [from, setFrom] = useState('Nuwara Eliya');
  const [to, setTo] = useState('Colombo');
  const [routeData, setRouteData] = useState(null);

  const calculateRoute = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/logistics/optimize-route?from=${from}&to=${to}`);
      const data = await res.json();
      setRouteData(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="glass-card">
      <h2>AgriRoute Optimizer</h2>
      <p style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)'}}>Powered by Dijkstra's Algorithm</p>

      <div className="form-group mt-1">
        <label>Origin</label>
        <select className="form-control" value={from} onChange={(e) => setFrom(e.target.value)}>
          <option>Nuwara Eliya</option>
          <option>Badulla</option>
          <option>Dambulla</option>
          <option>Kandy</option>
          <option>Kurunegala</option>
          <option>Ratnapura</option>
        </select>
      </div>

      <div className="form-group">
        <label>Destination (Market)</label>
        <select className="form-control" value={to} onChange={(e) => setTo(e.target.value)}>
          <option>Colombo</option>
          <option>Kurunegala</option>
          <option>Kandy</option>
        </select>
      </div>

      <button className="btn" onClick={calculateRoute} style={{width: '100%'}}>
        Find Fastest Path
      </button>

      {routeData && (
        <div className="mt-1">
          {routeData.path.length > 0 ? (
            <>
              <div className="alert success">
                <strong>Fastest Transit:</strong> {Math.floor(routeData.totalTimeMinutes / 60)}h {routeData.totalTimeMinutes % 60}m
              </div>
              <div style={{marginTop: '1rem'}}>
                <strong>Path:</strong>
                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem'}}>
                  {routeData.path.map((node, i) => (
                    <React.Fragment key={node}>
                      <span className="badge" style={{background: 'var(--primary)'}}>{node}</span>
                      {i < routeData.path.length - 1 && <span>➔</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="alert warning">No route found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default RouteOptimizer;
