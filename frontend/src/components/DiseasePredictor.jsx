import React, { useState } from 'react';

function DiseasePredictor() {
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);

  const diagnose = async () => {
    if (!symptoms) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8081/api/disease/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms })
      });
      const data = await res.json();
      setDiagnosis(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <h2>Crop Disease Diagnoser</h2>
      <p style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)'}}>Expert Rule-Based Engine (AI-Ready)</p>
      
      <div className="form-group mt-1">
        <label>Describe crop symptoms</label>
        <textarea 
          className="form-control" 
          rows="4" 
          placeholder="e.g., yellow spots on paddy leaves"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        ></textarea>
      </div>
      
      <button className="btn" onClick={diagnose} style={{width: '100%'}} disabled={loading}>
        {loading ? 'Analyzing...' : 'Diagnose Disease'}
      </button>

      {diagnosis && (
        <div className="alert info mt-1">
          <h3 style={{color: 'inherit', marginBottom: '0.5rem'}}>{diagnosis.disease}</h3>
          <p style={{margin: '0.5rem 0'}}><strong>Treatment:</strong> {diagnosis.treatment}</p>
          <span className="badge">Confidence: {diagnosis.confidence}</span>
        </div>
      )}
    </div>
  );
}

export default DiseasePredictor;
