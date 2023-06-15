import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  // use useEffect to check if the user is empty, we will try to fetch information about our user
  useEffect(() => {
    if(!user) {
      axios.get('/profile').then(({data}) => {
        setUser(data);
      });
     }
  }, [])
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}
