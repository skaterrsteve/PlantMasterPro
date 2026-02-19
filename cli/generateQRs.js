const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');

const plants = require('../backend/data/plants.json');
const outputDir = path.join(__dirname, '..', 'qr_codes');
const baseUrl = 'https://plantmasterpro-1.onrender.com/plants/';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

async function generateQR(plant) {
    const { id, commonName, botanicalName } = plant;
    const url = `${baseUrl}${id}`;
    
    const qrDataUrl = await QRCode.toDataURL(url, {
        margin: 1,
        width: 300,
        errorCorrectionLevel: 'H'
    });

    const qrImage = await loadImage(qrDataUrl);
    
    const canvasWidth = 350;
    const canvasHeight = 460; // Increased height for more text
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw QR code centered
    const qrX = (canvasWidth - 300) / 2;
    const qrY = 10;
    ctx.drawImage(qrImage, qrX, qrY, 300, 300);

    const maxWidth = canvasWidth - 40;
    let currentY = 330;

    // Draw Common Name (Bold)
    if (commonName) {
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        currentY = wrapText(ctx, commonName, canvasWidth / 2, currentY, maxWidth, 24);
    }

    // Draw Botanical Name (Italic)
    if (botanicalName) {
        ctx.fillStyle = '#444444';
        ctx.font = 'italic 16px Arial';
        ctx.textAlign = 'center';
        currentY += 4; // Small gap
        wrapText(ctx, botanicalName, canvasWidth / 2, currentY, maxWidth, 20);
    }

    // Save as JPEG
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
    
    // Create a descriptive filename including both names
    const cleanCommon = (commonName || '').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const cleanBotanical = (botanicalName || '').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    let fileLabel = cleanCommon;
    if (cleanBotanical && cleanBotanical !== cleanCommon) {
        fileLabel += (fileLabel ? '_' : '') + cleanBotanical;
    }
    if (!fileLabel) fileLabel = `plant_${id}`;
    
    const fileName = `${id}_${fileLabel}.jpg`.replace(/__+/g, '_'); // Remove double underscores
    fs.writeFileSync(path.join(outputDir, fileName), buffer);
    console.log(`Generated: ${fileName}`);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
    return y + lineHeight;
}

async function run() {
    console.log(`Clearing output directory: ${outputDir}`);
    if (fs.existsSync(outputDir)) {
        const files = fs.readdirSync(outputDir);
        for (const file of files) {
            fs.unlinkSync(path.join(outputDir, file));
        }
    } else {
        fs.mkdirSync(outputDir);
    }

    console.log(`Starting QR generation for ${plants.length} plants...`);
    for (const plant of plants) {
        try {
            await generateQR(plant);
        } catch (err) {
            console.error(`Error generating QR for plant ${plant.id}:`, err);
        }
    }
    console.log('Finished generating all QR codes.');
}

run();
