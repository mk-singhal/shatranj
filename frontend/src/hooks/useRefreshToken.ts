import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get("/refresh", { withCredentials: true });
      console.log(response.data);
      setAuth(response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.log(error);
      setAuth(null);
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;
