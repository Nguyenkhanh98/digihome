import useStyle from "./style";
import classnames from "classnames";
export function TopBannerComponent({ component: Component, ...props }: any) {
  // const { mutate, isLoading, isError, error, data } = useMutation(signup);
  const classes = useStyle();
  // console.log(isLoading, isError, error, data);

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
              If you are looking at blank cassettes on the web, you may be very
              confused at the difference in price. You may see some for as low
              as $.17 each. You may be saying to yourself.
            </p>
            <a href="#" className="primary-btn header-btn text-uppercase mt-10">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopBannerComponent;
