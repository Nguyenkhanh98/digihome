import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {useReadCachAppContext} from '@/caches/reads/appContext';
import {useWriteCacheAppContext} from '@/caches/writes/appContext';
import {useEffect} from 'react';

export default function BackDrop() {
  const updateAppContext = useWriteCacheAppContext();
  const appContext = useReadCachAppContext();

  useEffect(()=>{
    let timeoutId: any ;
    if(appContext.backdrop) {
      timeoutId= setTimeout(() => {
    updateAppContext({backdrop: false});
      }, 10000); 
    }
    return () => {
      clearTimeout(timeoutId);
    };
  },[appContext.backdrop]);

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={appContext.backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}