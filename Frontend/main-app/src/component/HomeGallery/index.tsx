import useStyle from "./style";
export function HomeGalleryComponent({ items = [] }: any) {
  return (
    <>
      <section className="gallery-area pb-120">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 pb-40 header-text text-center">
              <h1 className="pb-10">Our Recent Works may impress you</h1>
              <p>Who are in extremely love with eco friendly system.</p>
            </div>
          </div>
          <div className="row">
            {items.map((item: any) => {
              return (
                <div className="col-lg-4">
                  <div className="single-gallery">
                    <div className="content">
                      <a href="#" target="_blank">
                        <div className="content-overlay"></div>
                        <img
                          className="content-image img-fluid d-block mx-auto"
                          src={item.thumbnail}
                          alt=""
                        ></img>
                        <div className="content-details fadeIn-bottom">
                          <h3 className="content-title mx-auto">
                            Lavendar ambient interior
                          </h3>
                          <a
                            href="project-details.html"
                            className="primary-btn text-uppercase mt-20"
                          >
                            More Details
                          </a>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeGalleryComponent;
