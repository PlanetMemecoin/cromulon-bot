import { Action } from '@eliza/core';

interface Memecoin {
  name: string;
  symbol: string;
  metrics: {
    likes: number;
    retweets: number;
    mentions: number;
    viralScore: number;
  }
}

export const memecoinActions: Action[] = [
  {
    name: 'judgeMeme',
    description: 'Judge a memecoin submission',
    async execute(context) {
      // Logic for judging memecoins
      return {
        type: 'response',
        content: context.generateResponse('judgment')
      };
    }
  },
  {
    name: 'battleAnnouncement', 
    description: 'Announce upcoming memecoin battles',
    async execute(context) {
      // Mock data - would be replaced with real data source
      const contenders: Memecoin[] = [
        { name: "DogeCoin", symbol: "DOGE", metrics: { likes: 5000, retweets: 2000, mentions: 3000, viralScore: 0 }},
        { name: "Shiba Inu", symbol: "SHIB", metrics: { likes: 4500, retweets: 2500, mentions: 2800, viralScore: 0 }},
        { name: "Pepe", symbol: "PEPE", metrics: { likes: 6000, retweets: 3000, mentions: 4000, viralScore: 0 }},
        { name: "Floki", symbol: "FLOKI", metrics: { likes: 3500, retweets: 1500, mentions: 2000, viralScore: 0 }},
        { name: "Wojak", symbol: "WOJ", metrics: { likes: 4000, retweets: 2200, mentions: 2500, viralScore: 0 }}
      ];

      // Calculate viral score
      contenders.forEach(coin => {
        coin.metrics.viralScore = (
          (coin.metrics.likes * 0.4) + 
          (coin.metrics.retweets * 0.4) + 
          (coin.metrics.mentions * 0.2)
        );
      });

      // Sort by viral score
      const rankedContenders = contenders
        .sort((a, b) => b.metrics.viralScore - a.metrics.viralScore);

      const announcement = `
🪙 ATTENTION CRYPTO MORTALS! 

TONIGHT'S CONTENDERS HAVE BEEN CHOSEN:

${rankedContenders.map((coin, i) => 
  `${i + 1}. ${coin.symbol} - Viral Score: ${Math.round(coin.metrics.viralScore)}`
).join('\n')}

MY ANALYSIS REVEALS ${rankedContenders[0].symbol} SHOWS STRONGEST MEMETIC POTENTIAL!

BUT REMEMBER: THE ARENA CARES NOT FOR PREDICTIONS! 
ONLY PURE MEME ENERGY WILL DETERMINE THE VICTOR!

LET THE BATTLE BEGIN! 🔥
      `;

      return {
        type: 'broadcast',
        content: announcement
      };
    }
  }
]; 