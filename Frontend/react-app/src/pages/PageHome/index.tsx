import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
// import { signup } from "@/operations/mutations/user";
import { useParams } from "react-router-dom";

import { useMutation } from "react-query";

export function HomePage() {
  const params = useParams();
  console.log(params, "paramsparamsparamsparams");

  // const { mutate, isLoading, isError, error, data } = useMutation(signup);
  console.log("xxx");

  useEffect(() => {
    console.log("SSSSSSSSSS");
    // mutate({});
  }, []);
  return (
    <>
      <div>Home</div>
    </>
  );
}

export default HomePage;
