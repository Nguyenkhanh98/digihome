import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { signup } from "@/operations/mutations/user";

import { useMutation } from "react-query";
export function PageSignin({ component: Component, ...props }: any) {
  // const { mutate, isLoading, isError, error, data } = useMutation(signup);
  // console.log(isLoading, isError, error, data);
  console.log("xxx");

  useEffect(() => {
    console.log("SSSSSSSSSS");
    // mutate({});
  }, []);
  return (
    <>
      <div>signin</div>
    </>
  );
}

export default PageSignin;