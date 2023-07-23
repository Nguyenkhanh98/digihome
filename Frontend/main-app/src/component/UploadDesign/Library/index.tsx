import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import useStyle from "./style";
import OverlaySelect from "../OverlaySelect";

export default function LibraryComponent({ items, onClick }: any) {
  console.log(items, "itemsitemsitemsitemsitems");
  const classes = useStyle();
  return (
    <>
      <ImageList sx={{ height: 450 }}>
        {items.map((item: any) => (
          <ImageListItem
            key={item.img}
            className={classes.container}
            onClick={() => onClick(item)}
          >
            <img src={item.image} alt={item.title} loading="lazy" />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                ></IconButton>
              }
            />
            {item.isSelect && <OverlaySelect />}
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
