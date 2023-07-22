import { withMainLayout } from "@/hocs/withLayoutHome";

import { useParams } from "react-router-dom";
import TopBannerComponent from "@/component/TopBanner";
import { TemplateContainer } from "@/containters/TemplateContainer";

export function TemplatePage() {
  return (
    <>
      <TopBannerComponent />
      <TemplateContainer />
    </>
  );
}

export default withMainLayout(TemplatePage, {});
