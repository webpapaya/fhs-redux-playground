import { buildConnection } from 'datenkrake/src/adapters/postgrest';

export const connection = buildConnection({ baseURL: process.env.BACKEND_API });
global.api = connection;
