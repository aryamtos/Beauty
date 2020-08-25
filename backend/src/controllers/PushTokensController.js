const PushToken = require("../models/PushToken");

module.exports = {
  async show(req, res) {
    const { user, partner } = req.headers;
    let search;

    if (user) {
      search = await PushToken.findOne({ user: user });
    } else if (partner) {
      search = await PushToken.findOne({ partner: partner });
    }

    if (search) {
      return res.status(200).json(search);
    } else {
      return res.status(204).json({});
    }
  },

  async sendToId(req, res) {
    const { user, title, body } = req.body;
    let notifications = [];

    const foundUser = await PushToken.findById(user);
    const userToken = foundUser.token;

    notifications.push({
      to: userToken,
      sound: "default",
      title: title,
      body: body,
      data: { body },
    });

    let chunks = expo.chunkPushNotifications(notifications);

    (async () => {
      for (let chunk of chunks) {
        try {
          let receipts = await expo.sendPushNotificationsAsync(chunk);
          console.log(receipts);
        } catch (error) {
          console.error(error);
        }
      }
    })();

    return res.status(204);
  },
};
