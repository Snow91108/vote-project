import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './migrations/schema';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',        
  password: 'tiger', 
  database: 'vote_app',
});

client.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch(err => console.error('❌ PostgreSQL connection error:', err));

export const db = drizzle(client, { schema });
