import LoginComponent from "@/component/Login";
import  {
  useEffect,
} from "react";

import * as React from 'react';

// import { signup } from "@/operations/mutations/user";

// import { useMutation } from "react-query";
function PageSignin() {
  // const { mutate, isLoading, isError, error, data } = useMutation(signup);
  // console.log(isLoading, isError, error, data);
  console.log("xxx");

  useEffect(() => {
    console.log("SSSSSSSSSS");
    // mutate({});
  }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>
    <LoginComponent handleSubmit ={handleSubmit}/>
    </>
  );
}

export default PageSignin;
