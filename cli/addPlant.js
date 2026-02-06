const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const plantsFilePath = path.join(__dirname, '..', 'backend', 'data', 'plants.json');

async function addPlant() {
  const questions = [
    { type: 'input', name: 'landscapeCategory', message: 'Landscape category:' },
    { type: 'input', name: 'botanicalName', message: 'Botanical name:' },
    { type: 'input', name: 'commonName', message: 'Common name:' },
    { type: 'input', name: 'popularCultivars', message: 'Popular Cultivars:' },
    { type: 'input', name: 'family', message: 'Family:' },
    { type: 'input', name: 'origin', message: 'Origin:' },
    { type: 'input', name: 'classifications', message: 'Classifications:' },
    { type: 'input', name: 'shape', message: 'Shape:' },
    { type: 'input', name: 'size', message: 'Size:' },
    { type: 'input', name: 'growthRate', message: 'Growth Rate:' },
    { type: 'input', name: 'density', message: 'Density:' },
    { type: 'input', name: 'texture', message: 'Texture:' },
    { type: 'input', name: 'landscapeUses', message: 'Landscape uses:' },
    { type: 'input', name: 'lightRequirements', message: 'Light requirements:' },
    { type: 'input', name: 'soilNeeds', message: 'Soil needs:' },
    { type: 'input', name: 'waterNeeds', message: 'Water needs:' },
    { type: 'input', name: 'sunsetZone', message: 'Sunset zone:' },
    { type: 'input', name: 'usdaZone', message: 'USDA zone:' },
    { type: 'input', name: 'hardyTo', message: 'Hardy to:' },
    { type: 'input', name: 'tolerances', message: 'Tolerances:' },
    { type: 'input', name: 'flowerInfo', message: 'Flower Info:' },
    { type: 'input', name: 'fruitInfo', message: 'Fruit Info:' },
    { type: 'input', name: 'barkTrunk', message: 'Bark/Trunk:' },
    { type: 'input', name: 'rootType', message: 'Root type:' },
    { type: 'input', name: 'pruningNeeds', message: 'Pruning needs:' },
    { type: 'input', name: 'pestsAndDiseases', message: 'Pest and diseases:' },
    { type: 'input', name: 'plantLocation', message: 'Plant Location:' },
    { type: 'input', name: 'notes', message: 'Notes:' },
    { type: 'input', name: 'image', message: 'Image URL (optional):', default: 'https://via.placeholder.com/400x400.png?text=New+Plant' }
  ];

  const answers = await inquirer.default.prompt(questions);

  try {
    let plants = [];
    if (fs.existsSync(plantsFilePath)) {
      const data = fs.readFileSync(plantsFilePath, 'utf8');
      plants = JSON.parse(data);
    }

    const newId = (plants.length > 0 ? Math.max(...plants.map(p => parseInt(p.id))) : 0) + 1;

    const newPlant = {
      id: newId.toString(),
      ...answers
    };

    plants.push(newPlant);

    fs.writeFileSync(plantsFilePath, JSON.stringify(plants, null, 2), 'utf8');
    console.log(`Plant "${newPlant.commonName}" added successfully with ID: ${newPlant.id}`);
  } catch (error) {
    console.error('Error adding plant:', error);
  }
}

addPlant();
