import React, { useContext } from "react";

export const userContext: any = React.createContext({
  user: null
});

export const useSession = () => {
  const { user } = useContext(userContext);
  return user;
};
