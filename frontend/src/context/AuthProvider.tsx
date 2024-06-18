import * as React from "react";
import { UserProfileType } from "../Types";

type AuthContextType = {
  user: UserProfileType | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfileType | null>>;
  auth: string | null;
  setAuth: React.Dispatch<React.SetStateAction<string | null>>;
};

type Props = { children: React.ReactNode };

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<UserProfileType | null>(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
