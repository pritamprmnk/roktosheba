import axios  from "axios";

const axiosInstance = axios.create({
    baseURL: "https://rokto-sheba-server-mauve.vercel.app"
})

const useAxios = ()=>{
    return axiosInstance
}
export default useAxios;