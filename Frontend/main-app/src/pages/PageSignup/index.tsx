import { userSignupMutation } from "@/operations/mutations/user";

import { useMutation } from "@tanstack/react-query";
import SignupComponent from "@/component/Signup";
import { useWriteCacheAppContext } from "@/caches/writes/appContext";
import { toast } from "react-toastify";
import { isValidEmail } from "@/helpers/string";
import { useState } from "react";
export function PageSignup() {
  const { mutate } = useMutation(userSignupMutation);
  const updateAppContext = useWriteCacheAppContext();
  const [errors, setErrors] = useState({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    const firstName = data.get("firstName")?.toString();
    const lastName = data.get("lastName")?.toString();
    if (
      !email ||
      !password ||
      !isValidEmail(email) ||
      !firstName ||
      !lastName
    ) {
      setErrors({
        email: !email || !isValidEmail(email),
        password: !password,
        firstName: !firstName,
        lastName: !lastName,
      });
    } else {
      updateAppContext({ backdrop: true });
      setErrors({});
      mutate(
        { email, password },
        {
          onError: () => {
            toast.error("Some thing occurred. Please try again");
          },
          onSuccess: () => {
            toast.success("sRegister success, Let's login!");
          },
          onSettled: () => {
            updateAppContext({ backdrop: false });
          },
        }
      );
    }
  };

  return (
    <>
      <SignupComponent handleSubmit={handleSubmit} errors={errors} />
    </>
  );
}

export default PageSignup;
