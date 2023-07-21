import LoginComponent from "@/component/Login";
import { useEffect, useState } from "react";

import * as React from "react";

import { userSigninMutation } from "@/operations/mutations/user";

import { useMutation } from "@tanstack/react-query";
import { isValidEmail } from "@/helpers/string";
import { useWriteCacheAppContext } from "@/caches/writes/appContext";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import { loginSuccessAction } from "./helper";
import { useCustomNavigate } from "@/hooks/useRedirect";
function PageSignin() {
  const { mutate } = useMutation(userSigninMutation);
  const updateAppContext = useWriteCacheAppContext();
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const { state } = location;
  const navigate = useCustomNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();

    const onLoginSuccess = (data: any) => {
      updateAppContext({ token: data.accessToken, profile: data.user });
      loginSuccessAction(data);
    };

    if (!email || !password || !isValidEmail(email)) {
      setErrors({ email: !email || !isValidEmail(email), password: !password });
    } else {
      updateAppContext({ backdrop: true });
      setErrors({});
      mutate(
        { email, password },
        {
          onError: () => {
            toast.error("Some thing occurred. Please try again");
          },
          onSuccess: (data) => {
            onLoginSuccess(data.data);
            toast.success(
              `Login success, Welcome back ${data.data.user.firstName} ${data.data.user.lastName}!`
            );
            const navigatePath = state?.pathNavigate || "/";
            navigate(navigatePath);
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
      <LoginComponent
        handleSubmit={handleSubmit}
        errors={errors}
        state={state}
      />
    </>
  );
}

export default PageSignin;
