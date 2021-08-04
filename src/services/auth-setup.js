import axiosInstance from "./api";
import TokenService from "./token";

const setup = async () => {

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getToken();
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth" && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post("/auth", { apiKey: "23567b218376f79d9415" });

            const { token } = rs.data;
            axiosInstance.defaults.headers.common['Authentication'] = 'Bearer ' + token;
            TokenService.setToken(token);

            const resp = await axiosInstance.request({          
                method: originalConfig.method,          
                url: originalConfig.url,          
                params: originalConfig.params,          
                withCredentials: true,
                headers: {
                    'Authentication': 'Bearer ' + token
                }
              });      

              Promise.resolve(resp);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;