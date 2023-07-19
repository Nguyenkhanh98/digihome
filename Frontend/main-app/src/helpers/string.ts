import { emailRegex } from "./regex";

export const isValidEmail = (email) => {
  return emailRegex.test(email);
};
