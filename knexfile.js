require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: 'postgres://iwhwsgxwysqqhn:db87eca4dfe484dca8cbb9111059a3f7d2a1a19a95602c5c5839fb89f0f2e7b2@ec2-54-163-230-178.compute-1.amazonaws.com:5432/d9v35tsfp5lb8v?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    ssl: true,
    seeds: {
      directory: './db/seeds'
    }
  }

};
