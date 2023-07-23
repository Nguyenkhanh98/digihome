const env = import.meta.env;
export default {
  API: {
    URL: env.VITE_API_URL || "http://localhost:8080",
    USER_SIGN_UP_ENDPOINT: env.API_SIGN_UP_ENDPOINT || "/api/auth/register",
    USER_SIGN_IN_ENDPOINT: env.API_SIGN_IN_ENDPOINT || "/api/auth/login",
    TEMPLATE_ENDPOINT: env.API_TEMPLATE_ENDPOINT || "/api/template",
    DESIGN_ENDPOINT: env.API_DESIGN_ENDPOINT || "/api/design",
    MODEL_ENDPOINT: env.API_MODEL_ENDPOINT || "/api/models",
  },
  CMS_API: {
    URL: env.VITE_CMS_API_URL || "https://uat-cms-api.vietjet.io",
    LANGUAGE_ENDPOINT: env.CMS_LANGUAGE_ENDPOINT || "/api/v1/language",
    TRANSLATE_ENDPOINT: env.CMS_TRANSLATE_ENDPOINT || "/api/v1/fe-translations",
  },
  MICRO_FRONTEND_URL: {
    DESIGN_BOARD: env.VITE_DESIGN_BOARD_URL || "http://127.0.0.1:3003",
  },
  S3: {
    AWS_REGION: env.VITE_S3_AWS_REGION || "ap-southest-1",
    AWS_ACCESS_KEY_ID: env.VITE_S3_AWS_ACCESS_KEY_ID || "AKIA6MYXY65W4GOXBI6A",
    AWS_SECRET_ACCESS_KEY:
      env.VITE_S3_AWS_SECRET_ACCESS_KEY ||
      "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",
  },
};
