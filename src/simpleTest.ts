import { readFileSync } from 'fs';
import { join } from 'path';

try {
    const filePath = join(__dirname, '..', 'characterfile.json');
    const characterData = JSON.parse(readFileSync(filePath, 'utf-8'));
    
    console.log("=== Cromulon Test ===");
    console.log("Name:", characterData.name);
    console.log("\nBio:", characterData.bio[0]);
    console.log("\nFirst Response Test:");
    console.log(characterData.messageExamples[0].response);
} catch (error) {
    console.error("Error:", error.message);
} 