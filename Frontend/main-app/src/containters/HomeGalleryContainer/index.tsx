import HomeGalleryComponent from "@/component/HomeGallery";
import I1 from "@/assets/images/img/b1.jpg";
import I2 from "@/assets/images/img/b2.jpg";
import I3 from "@/assets/images/img/b3.jpg";
import I4 from "@/assets/images/img/b4.jpg";
import I5 from "@/assets/images/img/g1.jpg";
import I6 from "@/assets/images/img/g2.jpg";
export function HomeGalleryContainer({ component: Component, ...props }: any) {
  // const { mutate, isLoading, isError, error, data } = useMutation(signup);

  // console.log(isLoading, isError, error, data);

  const items = [
    { thumbnail: I1 },
    { thumbnail: I2 },
    { thumbnail: I3 },
    { thumbnail: I4 },
    { thumbnail: I5 },
    { thumbnail: I6 },
  ];
  return (
    <>
      <HomeGalleryComponent items={items} />
    </>
  );
}

export default HomeGalleryContainer;
