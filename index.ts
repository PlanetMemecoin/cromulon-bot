import { cromulonAgent } from './agent';
import { memecoinActions } from './actions/memecoin';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  // Register custom actions
  await cromulonAgent.registerActions(memecoinActions);
  
  // Start the agent
  await cromulonAgent.start();
  
  console.log('🪙 Cromulon is ready to judge memecoins!');
}

main().catch(console.error); 