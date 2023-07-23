import React from "react";
import HeaderContainer from "@/containters/HeaderContainer";
import FooterComponent from "@/component/FooterComponent";

export function withMainLayout(
  WrappedComponent: React.FunctionComponent<any>,
  metadata: any = null
) {
  return (props: any) => {
    return (
      <div>
        <HeaderContainer metadata={metadata} />
        <WrappedComponent {...props} />
        <FooterComponent />
      </div>
    );
  };
}
