const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'd3tmdauc72ark2',
    'iogwunknnuichm',
    'c1a47162b0ee091dbc1d3b73fdcf86ab5443c33051bad2036e01ba760a7e5732',
    {
        host: 'ec2-34-242-89-204.eu-west-1.compute.amazonaws.com',
        port: '5432',
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false
            }
          },
    }
)