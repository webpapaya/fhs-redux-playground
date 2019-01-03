import { buildConnection } from '../lib/repository/adapters/postgrest';

export const connection = buildConnection({ baseURL: 'http://localhost:3000' });
global.api = connection;

