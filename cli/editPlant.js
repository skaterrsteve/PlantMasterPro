const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const plantsFilePath = path.join(__dirname, '..', 'backend', 'data', 'plants.json');

async function editPlant() {
  try {
    let plants = [];
    if (fs.existsSync(plantsFilePath)) {
      const data = fs.readFileSync(plantsFilePath, 'utf8');
      plants = JSON.parse(data);
    }

    if (plants.length === 0) {
      console.log('No plants found to edit.');
      return;
    }

    console.log('Current Plants:');
    plants.forEach(plant => {
      console.log(`  ID: ${plant.id}, Common Name: ${plant.commonName || 'N/A'}, Botanical Name: ${plant.botanicalName || 'N/A'}`);
    });
    console.log('');

    const { idToEdit } = await inquirer.default.prompt([
      {
        type: 'input',
        name: 'idToEdit',
        message: 'Enter the ID of the plant to edit:',
        validate: input => {
          if (!input) return 'Plant ID cannot be empty.';
          if (!/^\d+$/.test(input)) return 'Plant ID must be a number.';
          if (!plants.some(p => p.id === input)) return 'Plant with this ID not found.';
          return true;
        }
      }
    ]);

    let plantToEdit = plants.find(p => p.id === idToEdit);
    if (!plantToEdit) {
      console.log(`Plant with ID ${idToEdit} not found.`);
      return;
    }

    console.log(`
Editing Plant ID: ${idToEdit} - ${plantToEdit.commonName || 'N/A'}`);
    console.log('Press Enter to keep current value, or type a new value.');

    const questions = [
      { type: 'input', name: 'landscapeCategory', message: 'Landscape category:', default: plantToEdit.landscapeCategory },
      { type: 'input', name: 'botanicalName', message: 'Botanical name:', default: plantToEdit.botanicalName },
      { type: 'input', name: 'commonName', message: 'Common name:', default: plantToEdit.commonName },
      { type: 'input', name: 'popularCultivars', message: 'Popular Cultivars:', default: plantToEdit.popularCultivars },
      { type: 'input', name: 'family', message: 'Family:', default: plantToEdit.family },
      { type: 'input', name: 'origin', message: 'Origin:', default: plantToEdit.origin },
      { type: 'input', name: 'classifications', message: 'Classifications:', default: plantToEdit.classifications },
      { type: 'input', name: 'shape', message: 'Shape:', default: plantToEdit.shape },
      { type: 'input', name: 'size', message: 'Size:', default: plantToEdit.size },
      { type: 'input', name: 'growthRate', message: 'Growth Rate:', default: plantToEdit.growthRate },
      { type: 'input', name: 'density', message: 'Density:', default: plantToEdit.density },
      { type: 'input', name: 'texture', message: 'Texture:', default: plantToEdit.texture },
      { type: 'input', name: 'landscapeUses', message: 'Landscape uses:', default: plantToEdit.landscapeUses },
      { type: 'input', name: 'lightRequirements', message: 'Light requirements:', default: plantToEdit.lightRequirements },
      { type: 'input', name: 'soilNeeds', message: 'Soil needs:', default: plantToEdit.soilNeeds },
      { type: 'input', name: 'waterNeeds', message: 'Water needs:', default: plantToEdit.waterNeeds },
      { type: 'input', name: 'sunsetZone', message: 'Sunset zone:', default: plantToEdit.sunsetZone },
      { type: 'input', name: 'usdaZone', message: 'USDA zone:', default: plantToEdit.usdaZone },
      { type: 'input', name: 'hardyTo', message: 'Hardy to:', default: plantToEdit.hardyTo },
      { type: 'input', name: 'tolerances', message: 'Tolerances:', default: plantToEdit.tolerances },
      { type: 'input', name: 'flowerInfo', message: 'Flower Info:', default: plantToEdit.flowerInfo },
      { type: 'input', name: 'fruitInfo', message: 'Fruit Info:', default: plantToEdit.fruitInfo },
      { type: 'input', name: 'barkTrunk', message: 'Bark/Trunk:', default: plantToEdit.barkTrunk },
      { type: 'input', name: 'rootType', message: 'Root type:', default: plantToEdit.rootType },
      { type: 'input', name: 'pruningNeeds', message: 'Pruning needs:', default: plantToEdit.pruningNeeds },
      { type: 'input', name: 'pestsAndDiseases', message: 'Pest and diseases:', default: plantToEdit.pestsAndDiseases },
      { type: 'input', name: 'plantLocation', message: 'Plant Location:', default: plantToEdit.plantLocation },
      { type: 'input', name: 'notes', message: 'Notes:', default: plantToEdit.notes },
      { type: 'input', name: 'image', message: 'Image URL (optional):', default: plantToEdit.image }
    ];

    const updatedAnswers = await inquirer.default.prompt(questions);

    // Update the plantToEdit object with new values
    Object.keys(updatedAnswers).forEach(key => {
      plantToEdit[key] = updatedAnswers[key];
    });

    // Replace the old plant object with the updated one in the array
    plants = plants.map(p => (p.id === idToEdit ? plantToEdit : p));

    fs.writeFileSync(plantsFilePath, JSON.stringify(plants, null, 2), 'utf8');
    console.log(`Plant ID ${idToEdit} updated successfully.`);

  } catch (error) {
    console.error('Error editing plant:', error);
  }
}

editPlant();
