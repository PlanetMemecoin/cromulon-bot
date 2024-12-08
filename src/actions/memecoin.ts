import { Action } from '@eliza/core';
import { TwitterApi } from 'twitter-api-v2';

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

async function getTwitterMetrics(symbol: string, client: TwitterApi) {
  try {
    // Get last 7 days of tweets
    const tweets = await client.v2.search(`$${symbol} -is:retweet`, {
      'start_time': new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      'tweet.fields': ['public_metrics']
    });

    const metrics = {
      likes: 0,
      retweets: 0,
      mentions: tweets.meta.result_count || 0
    };

    // Sum up metrics from all tweets
    for await (const tweet of tweets) {
      metrics.likes += tweet.public_metrics?.like_count || 0;
      metrics.retweets += tweet.public_metrics?.retweet_count || 0;
    }

    return metrics;
  } catch (error) {
    console.error(`Error fetching metrics for ${symbol}:`, error);
    return { likes: 0, retweets: 0, mentions: 0 };
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
      const useTwitter = context.flags?.useTwitter || false;
      let contenders: Memecoin[] = [];

      if (useTwitter) {
        const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);
        
        // List of coins to track
        const coins = [
          { name: "DogeCoin", symbol: "DOGE" },
          { name: "Shiba Inu", symbol: "SHIB" },
          { name: "Pepe", symbol: "PEPE" },
          { name: "Floki", symbol: "FLOKI" },
          { name: "Wojak", symbol: "WOJ" }
        ];

        // Get metrics for each coin
        contenders = await Promise.all(coins.map(async (coin) => {
          const metrics = await getTwitterMetrics(coin.symbol, client);
          return {
            name: coin.name,
            symbol: coin.symbol,
            metrics: { ...metrics, viralScore: 0 }
          };
        }));
      } else {
        // Use mock data if not using Twitter
        contenders = [
          { name: "DogeCoin", symbol: "DOGE", metrics: { likes: 5000, retweets: 2000, mentions: 3000, viralScore: 0 }},
          { name: "Shiba Inu", symbol: "SHIB", metrics: { likes: 4500, retweets: 2500, mentions: 2800, viralScore: 0 }},
          { name: "Pepe", symbol: "PEPE", metrics: { likes: 6000, retweets: 3000, mentions: 4000, viralScore: 0 }},
          { name: "Floki", symbol: "FLOKI", metrics: { likes: 3500, retweets: 1500, mentions: 2000, viralScore: 0 }},
          { name: "Wojak", symbol: "WOJ", metrics: { likes: 4000, retweets: 2200, mentions: 2500, viralScore: 0 }}
        ];
      }

      // Calculate viral score and generate announcement as before
      contenders.forEach(coin => {
        coin.metrics.viralScore = (
          (coin.metrics.likes * 0.4) + 
          (coin.metrics.retweets * 0.4) + 
          (coin.metrics.mentions * 0.2)
        );
      });

      const rankedContenders = contenders.sort((a, b) => b.metrics.viralScore - a.metrics.viralScore);

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