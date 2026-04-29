require('dotenv').config({ path: '.env.local' });

const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
neonConfig.webSocketConstructor = ws;

async function main() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    try {
        console.log('Testing pool.query with object...');
        const res = await pool.query({ text: 'SELECT NOW()' });
        console.log('✅ Object query worked! Time:', res.rows[0].now);
        
        console.log('Testing pool.query with values...');
        const res2 = await pool.query({ text: 'SELECT $1::text as val', values: ['hello'] });
        console.log('✅ Value query worked! Val:', res2.rows[0].val);
        
    } catch (error) {
        console.error('❌ Connection error:', error);
    } finally {
        await pool.end();
    }
}

main();
