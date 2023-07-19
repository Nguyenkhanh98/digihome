import LoginComponent from "@/component/Login";
import  {
  useEffect, useState,
} from "react";

import * as React from 'react';

import { userSigninMutation } from "@/operations/mutations/user";

import { useMutation } from "react-query";
import {isValidEmail} from "@/helpers/string";
import {useWriteCacheAppContext} from "@/caches/writes/appContext";
  import { toast } from 'react-toastify';
function PageSignin() {
  const { mutate} = useMutation(userSigninMutation);
  const updateAppContext = useWriteCacheAppContext();
  const [errors, setErrors] = useState({});
  // useEffect(()=>{
  //   if(data) {
  //   updateAppContext({backdrop: false});
  //   }
  // }, [data]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);

      const email = data.get('email')?.toString();
      const password = data.get('password')?.toString();
      if (!email || !password || !isValidEmail(email) ) {
        setErrors({email: !email || !isValidEmail(email)  ,password: !password })
      } else {
         updateAppContext({backdrop: true});
        setErrors({});
         mutate({email,password},{
          onError: ()=>{
             toast.error('Some thing occurred. Please try again');
          },
          onSuccess: ()=>{
             toast.success('Login success, Welcome back!');
          },
          onSettled: ()=> {
             updateAppContext({backdrop: false})
          }
         });
      }

  };

  return (
    <>
    <LoginComponent handleSubmit ={handleSubmit} errors={errors}/>
    </>
  );
}

export default PageSignin;
