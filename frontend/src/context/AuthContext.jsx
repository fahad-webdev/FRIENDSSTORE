import React ,{ createContext, useContext , useState , useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();

export const useAuth =()=>{
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) =>{
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyUser = async () => {
    const url = `http://192.168.1.109:5000/api/auth/verify`;
    setLoading(true);
    try {
      const response = await axios.get(url, { withCredentials: true });
      setUser(response.data.user);
      //console.log("Authorized User :: ",response.data.user);
    } catch (error) {
      //console.log("Unauthorized user", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {//slight to let browser save sensitive token in cookies
      verifyUser();
    }, 500);
  }, []);
    return (
        <AuthContext.Provider value={{user,loading}}>
            {children}
        </AuthContext.Provider>
    )
}