const bcrypt = require('bcrypt');

exports.seed = function (knex) {
  if (!process.env.SEED_MAPS_API_KEY) {
    throw new Error('Populate environment variable SEED_MAPS_API_KEY');
  }
  return knex('users')
    .del() // Deletes ALL existing entries
    .then(async function () {
      // Inserts seed entries one by one in series
      let adminPassword = await bcrypt.hash('admin', 5);
      await knex('users').insert({
        id: 'a88309ca-26cd-4d2b-8923-af0779e423a3',
        organization_id: 1,
        username: 'spladmin',
        password: adminPassword,
        email: 'admin@org.com',
        is_admin: true,
        maps_api_key: process.env.SEED_MAPS_API_KEY,
      });

      let testerPassword = await bcrypt.hash('theforce', 5);
      await knex('users').insert({
        id: 'a0845a0b-988b-43a7-b9f1-5fd6cac2cb12',
        organization_id: 2,
        username: 'jedi',
        password: testerPassword,
        email: 'jedi@org.com',
        is_admin: true,
        maps_api_key: process.env.SEED_MAPS_API_KEY,
      });

      await knex('users').insert({
        id: '14718564-f521-4079-8e1b-23694290fc09',
        idm_id: 'auth0|5ef53cdcf3ce32001a40ede7',
        organization_id: 1,
        username: 'safeplaces@extremesolution.com',
      });
    });
};
