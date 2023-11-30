export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',

  DB_USERNAME = 'admin',
  DB_PASSWORD = '12345678',
  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_NAME = 'chat'
} = process.env

export const IN_PROD = NODE_ENV === 'production'
