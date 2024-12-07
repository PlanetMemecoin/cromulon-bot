import { readFileSync } from 'fs';

// Load character file
const characterData = JSON.parse(readFileSync('./characterfile.json', 'utf-8'));

// Simple test function
function testCharacterResponse() {
    try {
        console.log("Character Name:", characterData.name);
        console.log("\nTesting message examples:");
        
        characterData.messageExamples.forEach((example: any, index: number) => {
            console.log(`\nTest ${index + 1}:`);
            console.log("User:", example.user);
            console.log("Message:", example.content.text);
            console.log("Response:", example.response);
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        } else {
            console.error("An unknown error occurred:", error);
        }
    }
}

testCharacterResponse(); 