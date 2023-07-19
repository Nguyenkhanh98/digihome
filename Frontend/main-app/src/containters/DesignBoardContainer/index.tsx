import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useMutation } from "react-query";
import eventBus from "@/services/eventBus";
import DesignBoardComponent from "@/component/DesignBoardComponent";
export function DesignBoardContainer() {

   useEffect(() => {
    // Listen for a custom event
    const eventListener = (data: any) => {
      console.log('React App received event:', data);
    };

    eventBus.on('customEvent', eventListener);

    // Clean up the event listener when the component unmounts
    return () => {
      eventBus.off('customEvent', eventListener);
    };
  }, []);
    const handleClick = () => {
    // Emit a custom event
    eventBus.emit('callStatic', { message: 'Hello from React App!' });
  };

  return (
    <>
    <DesignBoardComponent onClick={handleClick}/>
    </>
  );
}

export default DesignBoardContainer;
