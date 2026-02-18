import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PlantDetails() {
  const [plant, setPlant] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportText, setReportText] = useState('');
  const [reportStatus, setReportStatus] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/plants/${id}`)
      .then(response => {
        setPlant(response.data);
      })
      .catch(error => {
        console.error('Error fetching plant details:', error);
      });
  }, [id]);

  const handleReportSubmit = (e) => {
    e.preventDefault();
    setReportStatus('submitting');
    
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports`, {
      plantId: id,
      plantName: plant.commonName,
      message: reportText
    })
    .then(response => {
      setReportStatus('success');
      setReportText('');
      setTimeout(() => {
        setShowReportForm(false);
        setReportStatus('');
      }, 3000);
    })
    .catch(error => {
      console.error('Error submitting report:', error);
      setReportStatus('error');
    });
  };

  if (!plant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card my-4">
      <img src={plant.image} className="card-img-top" alt={plant.commonName || 'Plant Image'} style={{width: '400px', height: '400px', margin: 'auto', objectFit: 'cover'}} />
      <div className="card-body">
        <h1 className="card-title">{plant.commonName || 'N/A'}</h1>
        {plant.botanicalName && <h5 className="card-subtitle mb-2 text-muted">{plant.botanicalName}</h5>}
        
        <h2 className="mt-4">Plant Details</h2>
        <ul className="list-group list-group-flush">
          {plant.landscapeCategory && <li className="list-group-item"><strong>Landscape Category:</strong> {plant.landscapeCategory}</li>}
          {plant.family && <li className="list-group-item"><strong>Family:</strong> {plant.family}</li>}
          {plant.origin && <li className="list-group-item"><strong>Origin:</strong> {plant.origin}</li>}
          {plant.classifications && <li className="list-group-item"><strong>Classifications:</strong> {plant.classifications}</li>}
          {plant.shape && <li className="list-group-item"><strong>Shape:</strong> {plant.shape}</li>}
          {plant.size && <li className="list-group-item"><strong>Size:</strong> {plant.size}</li>}
          {plant.growthRate && <li className="list-group-item"><strong>Growth Rate:</strong> {plant.growthRate}</li>}
          {plant.density && <li className="list-group-item"><strong>Density:</strong> {plant.density}</li>}
          {plant.texture && <li className="list-group-item"><strong>Texture:</strong> {plant.texture}</li>}
          {plant.landscapeUses && <li className="list-group-item"><strong>Landscape Uses:</strong> {plant.landscapeUses}</li>}
          {plant.popularCultivars && <li className="list-group-item"><strong>Popular Cultivars:</strong> {plant.popularCultivars}</li>}
        </ul>

        <h2 className="mt-4">Care &amp; Environment</h2>
        <ul className="list-group list-group-flush">
          {plant.lightRequirements && <li className="list-group-item"><strong>Light Requirements:</strong> {plant.lightRequirements}</li>}
          {plant.soilNeeds && <li className="list-group-item"><strong>Soil Needs:</strong> {plant.soilNeeds}</li>}
          {plant.waterNeeds && <li className="list-group-item"><strong>Water Needs:</strong> {plant.waterNeeds}</li>}
          {plant.sunsetZone && <li className="list-group-item"><strong>Sunset Zone:</strong> {plant.sunsetZone}</li>}
          {plant.usdaZone && <li className="list-group-item"><strong>USDA Zone:</strong> {plant.usdaZone}</li>}
          {plant.hardyTo && <li className="list-group-item"><strong>Hardy To:</strong> {plant.hardyTo}</li>}
          {plant.tolerances && <li className="list-group-item"><strong>Tolerances:</strong> {plant.tolerances}</li>}
        </ul>

        <h2 className="mt-4">Characteristics</h2>
        <ul className="list-group list-group-flush">
          {plant.flowerInfo && <li className="list-group-item"><strong>Flower Info:</strong> {plant.flowerInfo}</li>}
          {plant.fruitInfo && <li className="list-group-item"><strong>Fruit Info:</strong> {plant.fruitInfo}</li>}
          {plant.barkTrunk && <li className="list-group-item"><strong>Bark/Trunk:</strong> {plant.barkTrunk}</li>}
          {plant.rootType && <li className="list-group-item"><strong>Root Type:</strong> {plant.rootType}</li>}
        </ul>
        
        <h2 className="mt-4">Notes</h2>
        <ul className="list-group list-group-flush">
          {plant.notes && <li className="list-group-item"><strong>Notes:</strong> {plant.notes}</li>}
        </ul>

        <div className="mt-5 pt-3 border-top text-center">
          {!showReportForm ? (
            <p className="text-muted small">
              Spot an error? <button className="btn btn-link btn-sm p-0 align-baseline" onClick={() => setShowReportForm(true)}>
                Report incorrect information
              </button>
            </p>
          ) : (
            <div className="text-start mt-3 p-3 bg-light rounded">
              <h6>Report an Error for {plant.commonName}</h6>
              <form onSubmit={handleReportSubmit}>
                <div className="mb-3">
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="Describe the error or missing information..."
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    required
                  ></textarea>
                </div>
                {reportStatus === 'success' && <div className="alert alert-success py-2 small">Report submitted! Thank you.</div>}
                {reportStatus === 'error' && <div className="alert alert-danger py-2 small">Error submitting report. Please try again.</div>}
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success btn-sm" disabled={reportStatus === 'submitting'}>
                    {reportStatus === 'submitting' ? 'Submitting...' : 'Submit Report'}
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowReportForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlantDetails;
