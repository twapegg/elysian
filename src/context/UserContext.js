import { createContext } from "react";

const UserContext = createContext();

export default UserContext;

export const UserProvider = UserContext.Provider;
