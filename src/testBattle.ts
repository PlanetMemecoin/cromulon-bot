import { memecoinActions } from './actions/memecoin';

async function testBattle() {
    try {
        // Test with mock data first
        const mockContext = {
            flags: { useTwitter: false }
        };
        
        const mockBattle = await memecoinActions[1].execute(mockContext);
        console.log('\n=== Mock Battle Test ===');
        console.log(mockBattle.content);

        // Test with Twitter if bearer token exists
        if (process.env.TWITTER_BEARER_TOKEN) {
            const twitterContext = {
                flags: { useTwitter: true }
            };
            
            console.log('\n=== Live Twitter Battle Test ===');
            const liveBattle = await memecoinActions[1].execute(twitterContext);
            console.log(liveBattle.content);
        }
    } catch (error) {
        console.error('Test failed:', error);
    }
}

testBattle(); 