import { createContext, useEffect, useState } from "react";

const Auth = createContext();

function Provider({ children }) {
  const [token, setToken] = useState(
    window.sessionStorage.getItem("746f6b656e")
  );

  useEffect(() => {
    if (token) {
      window.sessionStorage.setItem("746f6b656e", token);
    } else {
      window.sessionStorage.removeItem("746f6b656e");
    }
  }, [token]);

  return <Auth.Provider value={{ token, setToken }}>{children}</Auth.Provider>;
}

export { Auth, Provider };
