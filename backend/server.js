const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

const plants = require('./data/plants.json');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());

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

app.post('/api/reports', (req, res) => {
  const { plantId, plantName, message } = req.body;
  const reportsPath = path.join(__dirname, 'data', 'reports.json');
  
  const newReport = {
    timestamp: new Date().toISOString(),
    plantId,
    plantName,
    message
  };

  try {
    let reports = [];
    if (fs.existsSync(reportsPath)) {
      reports = JSON.parse(fs.readFileSync(reportsPath, 'utf8'));
    }
    reports.push(newReport);
    fs.writeFileSync(reportsPath, JSON.stringify(reports, null, 2));
    res.status(201).send('Report saved');
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).send('Error saving report');
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
