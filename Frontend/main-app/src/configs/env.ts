const env = import.meta.env;

export default {
  API: {
    URL: env.API_URL || "http://localhost:3000",
    USER_SIGN_UP_ENDPOINT: env.API_USER_ENDPOINT || "/api/v1/auth/signup",
    USER_SIGN_IN_ENDPOINT: env.API_USER_ENDPOINT || "/api/v1/auth/signin",
  },
  CMS_API: {
    URL: env.API_URL || "https://uat-cms-api.vietjet.io",
    LANGUAGE_ENDPOINT: env.CMS_LANGUAGE_ENDPOINT || "/api/v1/language",
    TRANSLATE_ENDPOINT: env.CMS_TRANSLATE_ENDPOINT || "/api/v1/fe-translations",
  },
  MICRO_FRONTEND_URL: {
    DESIGN_BOARD: env.DESIGN_BOARD_URL || "http://127.0.0.1:3003",
  },
};
