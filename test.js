const fs = require('fs');

// Load character file
const characterData = JSON.parse(fs.readFileSync('./characterfile.json', 'utf-8'));

// Test function
function testCharacter() {
    console.log("=== Testing Cromulon Character ===\n");
    console.log("Name:", characterData.name);
    console.log("\nBio:", characterData.bio.join("\n"));
    console.log("\nTesting responses:");
    
    characterData.messageExamples.forEach((example, i) => {
        console.log(`\nTest ${i + 1}:`);
        console.log(`Input: ${example.content.text}`);
        console.log(`Response: ${example.response}`);
        console.log("-".repeat(50));
    });
}

testCharacter(); 