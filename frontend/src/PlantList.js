import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PlantList() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/plants`)
      .then(response => {
        setPlants(response.data);
      })
      .catch(error => {
        console.error('Error fetching plants:', error);
      });
  }, []);

  return (
    <div>
      <h1 className="my-4">All Plants</h1>
      <div className="list-group">
        {plants.map(plant => (
          <Link key={plant.id} to={`/plants/${plant.id}`} className="list-group-item list-group-item-action">
            {plant.commonName}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PlantList;
