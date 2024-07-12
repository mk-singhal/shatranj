import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { axiosFilePrivate } from "../api/axios";

const useAxiosFilePrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosFilePrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosFilePrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log(newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosFilePrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosFilePrivate.interceptors.request.eject(requestIntercept);
      axiosFilePrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosFilePrivate;
};

export default useAxiosFilePrivate;
