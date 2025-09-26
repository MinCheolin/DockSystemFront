import axios from "axios";
import { ERP_API } from "../../config";
import { MES_API } from "../../config";
import { LOGIN_API } from "../../config";

export const ERPapi = axios.create({
  baseURL: ERP_API,
});

export const MESapi = axios.create({
  baseURL: MES_API,
});

export const LOGINapi = axios.create({
  baseURL: LOGIN_API,
});

const addInterceptor = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

addInterceptor(ERPapi);
addInterceptor(MESapi);
addInterceptor(LOGINapi);
