const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const plantsFilePath = path.join(__dirname, '..', 'backend', 'data', 'plants.json');

async function addPlant() {
  const questions = [
    { type: 'input', name: 'landscapeCategory', message: 'Landscape category:' },
    { type: 'input', name: 'botanicalName', message: 'Botanical name:' },
    { type: 'input', name: 'commonName', message: 'Common name:' },
    { type: 'input', name: 'family', message: 'Family:' },
    { type: 'confirm', name: 'isNative', message: 'Is this plant Native?', default: false },
    { type: 'input', name: 'size', message: 'Size:' },
    { type: 'input', name: 'growthRate', message: 'Growth Rate:' },
    { type: 'input', name: 'lightRequirements', message: 'Light requirements:' },
    { type: 'input', name: 'waterNeeds', message: 'Water needs:' },
    { type: 'input', name: 'usdaZone', message: 'USDA zone:' },
    { type: 'input', name: 'hardyTo', message: 'Hardy to:' },
    { type: 'input', name: 'flowerInfo', message: 'Flower Info:' },
    { type: 'input', name: 'fruitInfo', message: 'Fruit Info:' },
    { type: 'input', name: 'notes', message: 'Notes:' }
  ];

  const answers = await inquirer.default.prompt(questions);

  try {
    let plants = [];
    if (fs.existsSync(plantsFilePath)) {
      const data = fs.readFileSync(plantsFilePath, 'utf8');
      if (data) {
        plants = JSON.parse(data);
      }
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
