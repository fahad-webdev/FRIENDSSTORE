import { useContext, createContext, useState } from "react";
const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [SearchQuery, setSearchQuery] = useState("")//for search query
  const [searchOpen, setSearchOpen] = useState("close");//for search open/close
  const [sidebar, setSidebar] = useState(false);
  const [useProfileDrop , setUserProfileDrop] = useState(false);

  const [alert , setAlert] = useState({
      alert:false,
      message:"",
      type:""
    });

    const [alertBox , setAlertBox ] = useState({
      alert:false,
      head:"",
      message:"",
      onConfirm:null,
    })
  return (
    <ApiContext.Provider value={{useProfileDrop , setUserProfileDrop,searchOpen, setSearchOpen, SearchQuery , setSearchQuery ,setAlert ,alert ,sidebar, setSidebar,alertBox , setAlertBox}}>
      {children}
    </ApiContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(ApiContext);
};
