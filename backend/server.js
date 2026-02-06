const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

const plants = require('./data/plants.json');

app.use(cors());

app.get('/api/plants', (req, res) => {
  res.json(plants);
});

app.get('/api/plants/:id', (req, res) => {
  const plant = plants.find(p => p.id === req.params.id);
  if (plant) {
    res.json(plant);
  } else {
    res.status(404).send('Plant not found');
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
