const { Op } = require("sequelize");
const {
  FRIEND_ACCEPTED,
  FRIEND_STATUS_ANONYMOUS,
  FRIEND_STATUS_ACCEPTER,
  FRIEND_STATUS_REQUESTER,
  FRIEND_STATUS_FRIEND,
  FRIEND_STATUS_ME,
} = require("../config/constants");
const { User, Friend } = require("../models");

exports.findUserFriendsByUserId = async (id) => {
  // select * from friends where status = 'accepted' and (requester_id="2" or accepter_id="2")
  const friends = await Friend.findAll({
    where: {
      status: FRIEND_ACCEPTED,
      [Op.or]: [{ requesterId: id }, { accepterId: id }],
    },
  });

  const friendIds = friends.map((item) =>
    item.requesterId === id ? item.accepterId : item.requesterId
  );

  return User.findAll({
    where: { id: friendIds },
    attributes: { exclude: "password" },
  });
};

exports.findStatusWithMe = async (meId, userId) => {
  if (meId === userId) {
    return FRIEND_STATUS_ME;
  }
  console.log(meId);
  console.log(userId);
  const friend = await Friend.findOne({
    where: {
      [Op.or]: [
        { requesterId: meId, accepterId: userId },
        { requesterId: userId, accepterId: meId },
      ],
    },
  });

  if (!friend) {
    return FRIEND_STATUS_ANONYMOUS;
  }
  if (friend.status === FRIEND_ACCEPTED) {
    return FRIEND_STATUS_FRIEND;
  }
  if (friend.requesterId === meId) {
    return FRIEND_STATUS_REQUESTER;
  }
  return FRIEND_STATUS_ACCEPTER;
};
