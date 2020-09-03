import React, { useContext } from "react";
import AuthContext from "../contexts/auth";

import AuthRoutes from "../routes/AuthRoutes";
import AppRoutes from "../routes/AppRoutes";

export default function AuthHandler() {
  const { signed } = useContext(AuthContext);

  return <>{!signed ? <AuthRoutes /> : <AppRoutes />}</>;
}
