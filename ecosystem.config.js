const { max } = require("./src/database/knex");

module.exports = {
  apps : [{
    name: 'app',
    script: './src/server.js',
    instances: "max",
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
