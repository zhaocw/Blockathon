// Allows us to use ES6 in our migrations and tests.
module.exports = {
  networks: {
    // ganache: {
    //   host: '127.0.0.1',
    //   port: 7545,
    //   network_id: '*' // Match any network id
    // },
    development: {
      host: 'localhost',
      port: 8545,
      gas: 1900000,
      network_id: '*'
    },
  },
  migrations_directory: './migrations'
}
