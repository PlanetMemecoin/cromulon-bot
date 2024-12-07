import { ElizaAgent, ClientConfig } from '@eliza/core';

export const cromulonAgent = new ElizaAgent({
  characterPath: './characterfile.json',
  clients: {
    discord: {
      token: process.env.DISCORD_TOKEN,
      intents: ['Guilds', 'GuildMessages', 'MessageContent']
    },
    twitter: {
      apiKey: process.env.TWITTER_API_KEY,
      apiSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET
    }
  },
  memory: {
    type: 'vector',
    settings: {
      collection: 'cromulon_memory'
    }
  }
}); 