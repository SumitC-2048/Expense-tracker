import axios from "axios";

const AUTH_NOTICE_KEY = "authNotice";
const SESSION_EXPIRED_MESSAGE =
  "Your session has expired. Please sign in!";

function requestHadBearerToken(config) {
  if (!config?.headers) return false;
  const h = config.headers;
  let auth;
  if (typeof h.get === "function") {
    auth =
      h.get("Authorization") ||
      h.get("authorization") ||
      h.get("AUTHORIZATION");
  }
  auth = auth ?? h.Authorization ?? h.authorization;
  return typeof auth === "string" && auth.startsWith("Bearer ");
}

const client = axios.create();

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 && requestHadBearerToken(error.config)) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      sessionStorage.setItem(AUTH_NOTICE_KEY, SESSION_EXPIRED_MESSAGE);
      const path = window.location.pathname || "";
      if (
        !path.toLowerCase().startsWith("/signin") &&
        !path.toLowerCase().startsWith("/signup")
      ) {
        window.location.assign("/signin");
      }
    }
    return Promise.reject(error);
  }
);

export default client;
export { AUTH_NOTICE_KEY, SESSION_EXPIRED_MESSAGE };
