import React from "react";
import HeaderContainer from "@/containters/HeaderContainer";
import FooterComponent from "@/component/FooterComponent";

export function withLayoutDesign(
  WrappedComponent: React.FunctionComponent<any>,
  metadata: any = null
) {
  return (props: any) => {

    return (
      <div>
        <WrappedComponent {...props} />
      </div>
    );
  };
}
