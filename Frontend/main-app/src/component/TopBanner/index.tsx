import useStyle from "./style";
import classnames from "classnames";
import { useCustomNavigate } from "@/hooks/useRedirect";
export function TopBannerComponent() {
  const navigate = useCustomNavigate();
  const classes = useStyle();
  return (
    <section
      className={classnames("banner-area relative", {
        [classes.container]: true,
      })}
    >
      <div className="overlay overlay-bg"></div>
      <div className="container">
        <div
          className="row fullscreen d-flex justify-content-center align-items-center"
          style={{ height: "880px" }}
        >
          <div className="banner-content col-lg-9 col-md-12 justify-content-center ">
            <h1>Precise concept design for stylish living</h1>
            <p className="text-white mx-auto">
              If you are looking at a place where you can design your dream house. You'll see that's is exactly our goals to help you on the way make it come true. 
            </p>
            <div className="primary-btn header-btn text-uppercase mt-10" onClick={() =>navigate('design-board')}>
              Get Started
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopBannerComponent;
