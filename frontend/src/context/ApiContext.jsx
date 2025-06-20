import { useContext, createContext, useState } from "react";
const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [SearchQuery, setSearchQuery] = useState("")//for search query
  const [searchOpen, setSearchOpen] = useState("close");//for search open/close
  const [sidebar, setSidebar] = useState(false);
  
  const [alert , setAlert] = useState({
      alert:false,
      message:"",
      type:""
    });
  return (
    <ApiContext.Provider value={{searchOpen, setSearchOpen, SearchQuery , setSearchQuery ,setAlert ,alert ,sidebar, setSidebar}}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  return useContext(ApiContext);
};
