import { withMainLayout } from "@/hocs/withLayoutHome";

import TopBannerComponent from "@/component/TopBanner";
import { TemplateContainer } from "@/containters/TemplateContainer";

function TemplatePage() {
  return (
    <>
      <TemplateContainer />
    </>
  );
}

export default withMainLayout(TemplatePage, { isHiddenPG: true });
