import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { withMainLayout } from "@/hocs/withLayoutHome";

// import { signup } from "@/operations/mutations/user";
import { useParams } from "react-router-dom";
import TopBannerComponent from "@/component/TopBanner";
import { useMutation } from "react-query";
import HomeGalleryContainer from "@/containters/HomeGalleryContainer";

export function HomePage() {
  const params = useParams();

  // const { mutate, isLoading, isError, error, data } = useMutation(signup);

  useEffect(() => {
    console.log("SSSSSSSSSS");
    // mutate({});
  }, []);
  return (
    <>
      <TopBannerComponent />
      <HomeGalleryContainer />
    </>
  );
}

export default withMainLayout(HomePage, {});
