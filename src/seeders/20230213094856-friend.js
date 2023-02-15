"use strict";
const { FRIEND_ACCEPTED } = require("../config/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    // 1,3,4,5,12
    return queryInterface.bulkInsert("friends", [
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 1,
        accepter_id: 3,
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 3,
        accepter_id: 4,
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 12,
        accepter_id: 5,
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 1,
        accepter_id: 12,
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 5,
        accepter_id: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("friends", null, {});
  },
};
