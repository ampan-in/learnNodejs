module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'product',
      },
      migrations: {
        directory: './database/migrations',
      },
      seeds: {
        directory: './seeds',
      },
    },
    production: {
      client: 'mysql2',
      connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'product',
      },
      migrations: {
        directory: './database/migrations',
      },
      seeds: {
        directory: './seeds',
      },
    },
  };
  