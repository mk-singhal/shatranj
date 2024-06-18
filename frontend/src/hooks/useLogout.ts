import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth(null);
    try {
      await axios.post("/logout");
    } catch (error) { 
      console.log(error);
    } 
  };

  return logout;
};

export default useLogout;