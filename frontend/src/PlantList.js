import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PlantList() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/plants`)
      .then(response => {
        setPlants(response.data);
      })
      .catch(error => {
        console.error('Error fetching plants:', error);
      });
  }, []);

  const filteredPlants = plants.filter(plant => 
    (plant.commonName && plant.commonName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (plant.botanicalName && plant.botanicalName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1>All Plants</h1>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="list-group">
        {filteredPlants.length > 0 ? (
          filteredPlants.map(plant => (
            <Link key={plant.id} to={`/plants/${plant.id}`} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <span>
                <strong>{plant.commonName}</strong>
                {plant.botanicalName && <small className="text-muted ms-2">({plant.botanicalName})</small>}
              </span>
              <span className="badge bg-success rounded-pill">View Info</span>
            </Link>
          ))
        ) : (
          <div className="list-group-item text-center py-4">
            <p className="mb-0 text-muted">No plants found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlantList;
