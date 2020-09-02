import React, { createContext, useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AsyncStorage } from "react-native";

const AuthContext = createContext({
  signed: null,
  token: "",
  user: {},
  type: "user",
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [type, setType] = useState("user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCredentials() {
      const loadedToken = await AsyncStorage.getItem("@BeautyAuth:token");
      const loadedType = await AsyncStorage.getItem("@BeautyAuth:type");

      if (loadedToken && loadedType) {
        setToken(loadedToken);
        setType(loadedType);
      }

      setLoading(false);
    }

    loadCredentials();
  }, []);

  async function signIn(givenToken, givenType) {
    setType(givenType);
    setToken(givenToken);

    await AsyncStorage.setItem("@BeautyAuth:token", givenToken);
    await AsyncStorage.setItem("@BeautyAuth:type", givenType);
  }

  async function signOut() {
    setToken("");

    await AsyncStorage.removeItem("@BeautyAuth:token");
    await AsyncStorage.removeItem("@BeautyAuth:type");
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#511D68" />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(!!token),
        user,
        token,
        type,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
