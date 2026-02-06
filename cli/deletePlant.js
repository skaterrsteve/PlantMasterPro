const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const plantsFilePath = path.join(__dirname, '..', 'backend', 'data', 'plants.json');

async function deletePlant() {
  try {
    let plants = [];
    if (fs.existsSync(plantsFilePath)) {
      const data = fs.readFileSync(plantsFilePath, 'utf8');
      plants = JSON.parse(data);
    }

    if (plants.length === 0) {
      console.log('No plants found to delete.');
      return;
    }

    console.log('Current Plants:');
    plants.forEach(plant => {
      console.log(`  ID: ${plant.id}, Common Name: ${plant.commonName || 'N/A'}, Botanical Name: ${plant.botanicalName || 'N/A'}`);
    });
    console.log('');

    const answers = await inquirer.default.prompt([
      {
        type: 'input',
        name: 'plantId',
        message: 'Enter the ID of the plant to delete:',
        validate: input => {
          if (!input) return 'Plant ID cannot be empty.';
          if (!/^\d+$/.test(input)) return 'Plant ID must be a number.';
          if (!plants.some(p => p.id === input)) return 'Plant with this ID not found.';
          return true;
        }
      }
    ]);

    const idToDelete = answers.plantId;
    const initialLength = plants.length;
    plants = plants.filter(plant => plant.id !== idToDelete);

    if (plants.length < initialLength) {
      fs.writeFileSync(plantsFilePath, JSON.stringify(plants, null, 2), 'utf8');
      console.log(`Plant with ID ${idToDelete} deleted successfully.`);
    } else {
      console.log(`Plant with ID ${idToDelete} not found.`);
    }

  } catch (error) {
    console.error('Error deleting plant:', error);
  }
}

deletePlant();
