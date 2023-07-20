import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useReadCachAppContext } from "@/caches/reads/appContext";
import { useWriteCacheAppContext } from "@/caches/writes/appContext";
import { useEffect } from "react";
import { TAppContext } from "@/caches/types";

export default function BackDrop() {
  const updateAppContext = useWriteCacheAppContext();
  const appContext: TAppContext = useReadCachAppContext();

  useEffect(() => {
    let timeoutId: any;
    if (appContext.backdrop) {
      timeoutId = setTimeout(() => {
        updateAppContext({ backdrop: false });
      }, 10000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [appContext.backdrop]);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={appContext.backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
