import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

// Default API will be your root

const API_ROOT = process.env.REACT_APP_ENDPOINT || "";
const TIMEOUT = 20000;

/**
 *
 * @param {}
 * @returns
 */
const apiService = ({
  baseURL = API_ROOT,
  timeout = TIMEOUT,
  headerType = "json",
}) => {
  const headers = getHeader(headerType);

  const client = axios.create({
    baseURL,
    timeout,
    headers,
  });

  // Intercept response object and handleSuccess and Error Object
  client.interceptors.response.use(handleSuccess, handleError);

  function getHeader(headerType) {
    const access_token = tokenService.getAccessToken();
    let header = {};

    switch (headerType) {
      case "json":
        header = {
          "Content-Type": "application/json",
          Authorization: access_token ? `Bearer ${access_token}` : "",
          debug: "false",
        };
        break;

      case "multipart":
        header = {
          "Content-Type": "multipart/form-data",
          Authorization: access_token ? `Bearer ${access_token}` : "",
          debug: "false",
        };
        break;

      default:
        header = { "Content-Type": "application/json", debug: "false" };
    }

    return header;
  }

  function handleSuccess(response) {
    return response;
  }

  /** Intercept any unauthorized request.
   * status 401 means either accessToken is expired or invalid
   * dispatch logout action accordingly **/
  function handleError(error) {
    const status = error.response?.status;
    const data = error.response?.data;
    if (status === 401) {
      const dispatch = store.dispatch;
      dispatch(logout());
    }
    return Promise.reject(data);
  }

  function get(path) {
    return client.get(path).then((response) => response.data);
  }

  function post(path, payload) {
    return client.post(path, payload).then((response) => response.data);
  }

  function put(path, payload) {
    return client.put(path, payload).then((response) => response.data);
  }

  function patch(path, payload) {
    return client.patch(path, payload).then((response) => response.data);
  }

  function _delete(path, data) {
    if (data) {
      return client
        .delete(path, { data: data })
        .then((response) => response.data);
    }
    return client.delete(path).then((response) => response.data);
  }

  return {
    get,
    post,
    put,
    patch,
    delete: _delete,
  };
};

export default apiService;
