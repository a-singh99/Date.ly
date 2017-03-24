// // Update with your config settings.

// module.exports = {

//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: './dev.sqlite3'
//     }
//   },

//   staging: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   },

//   production: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   }

// };

// module.exports = {
//   client: 'pg',
//   connection: process.env.DATABASE_URL || { 
//     user: 'postgres', // or other user if you made one
//     password: 'postgres', 
//     database: 'dately' 
//   }
// };

module.exports = {
  client: 'pg',
  connection: 'postgres://zbruutyv:h3iXrLLE_gb7xHwl7JhSa_9qvmct2AKI@stampy.db.elephantsql.com:5432/zbruutyv'
 || { 
    user: 'zbruutyv', // or other user if you made one
    password: '	h3iXrLLE_gb7xHwl7JhSa_9qvmct2AKI', 
    database: 'dately' 
  }
};
