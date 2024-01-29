import axios from "axios";
import jwt from "jsonwebtoken";

export const post = async (data: { key: string }, url: string) => {
  const response = await axios.post(url, data).catch((err) => err.response);

  return response.data;
};

export const fetcher = async (url: string) => {
  const token = localStorage.getItem("access_token");
  const headers: any = {};
  if (url.startsWith("/api")) {
    // url = process.env.API_HOST + url.substring(4);
    // url = process.env.API_HOST + url;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(url, {
    headers: headers,
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      if (token) {
        localStorage.removeItem("access_token");
        window.location.href = "/auth/login";
      }
      window.location.href = "/auth/login";
    }
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (config.url.startsWith("/api")) {
      // config.url = process.env.API_HOST + config.url.substring(4);
      config.url = process.env.API_HOST + config.url;
      const token = localStorage.getItem("access_token");
      if (token) {
        const headers: any = config.headers;
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use((res) => res.data);

export function is_valid_access_token(access_token) {
  const data = jwt.decode(access_token);
  return true;
}

export function getCellValue(row, col) {
  if (typeof col.value == "string") {
    switch (typeof row[col.value]) {
      case "string":
        return row[col.value];
      case "number":
        return row[col.value].toLocaleString();
      case "undefined":
        return "";
    }
    if (isNaN(row[col.value])) return "";
    if (row[col.value] == null) return "";
    return row[col.value].toString();
  }
  if (typeof col.value == "function") return col.value(row);
}

export { axios };
