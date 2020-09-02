import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const PUSH_ENDPOINT = "http://192.168.0.106:4444/token";

const registerForPushNotifications = async (id, type) => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    alert("No notification permissions!");
    return;
  }

  // Get the token that identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  if (type === "user") {
    return fetch(PUSH_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: {
          value: token,
        },
        user: id,
      }),
    });
  } else if (type === "partner") {
    return fetch(PUSH_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: {
          value: token,
        },
        partner: id,
      }),
    });
  }
};
export default registerForPushNotifications;
