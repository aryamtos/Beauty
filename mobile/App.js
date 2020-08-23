import React, { useEffect } from "react";
import Routes from "./src/routes.js";

import registerForPushNotifications from "./src/services/registerForPushNotifications";

export default function App() {
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  return <Routes />;
}
