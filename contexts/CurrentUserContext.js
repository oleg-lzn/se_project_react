import { createContext } from "react";

export const CurrentUserContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
});
