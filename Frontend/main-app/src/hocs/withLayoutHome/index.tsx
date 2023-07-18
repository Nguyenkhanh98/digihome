import React from "react";
import HeaderContainer from "@/containters/HeaderContainer";
import FooterComponent from "@/component/FooterComponent";

export function withMainLayout(
  WrappedComponent: React.FunctionComponent<any>,
  metadata: any = null
) {
  return (props: any) => {
    // const classes = useStyle();
    // const isMobile = !useDetectScreen();
    return (
      <div>
        <HeaderContainer />
        <WrappedComponent {...props} />
        <FooterComponent />
      </div>
    );
  };
}
