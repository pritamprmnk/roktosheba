import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";

const axiosSecure = axios.create({
  baseURL: "https://rokto-sheba-server-mauve.vercel.app",
});

const useAxiosSecure = () => {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading || !user) return;

    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const token = await user.getIdToken();
        config.headers.authorization = `Bearer ${token}`;
        return config;
      }
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log("AXIOS ERROR:", error.response?.status);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, loading]);

  return axiosSecure;
};

export default useAxiosSecure;
