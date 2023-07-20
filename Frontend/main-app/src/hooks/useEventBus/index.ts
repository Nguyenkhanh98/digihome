import { EventBus } from "@/services/eventBus";
import { useEffect } from "react";

type TEvent = {
  [key: string]: any;
};

export function useEventBus(eventBus: EventBus, event: TEvent) {
  useEffect(() => {
    if (eventBus.getInstance()) {
      Object.entries(event).forEach(([action, handler]) => {
        eventBus.on(action, handler);
      });
    }

    return () => {
      Object.entries(event).forEach(([action, handler]) => {
        eventBus.off(action, handler);
      });
    };
  }, [event]);
}
