import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { withLayoutDesign } from "@/hocs/withLayoutDesign";

// import { signup } from "@/operations/mutations/user";
import { useParams } from "react-router-dom";
import DesignBoardContainer from "@/containters/DesignBoardContainer";

 function DesignBoard() {
  const params = useParams();

  // const { mutate, isLoading, isError, error, data } = useMutation(signup);

  useEffect(() => {
    console.log("SSSSSSSSSS");
    // mutate({});
  }, []);
  return (
    <>
      <DesignBoardContainer />
    </>
  );
}

export default withLayoutDesign(DesignBoard);
