import { Env } from "@/configs";

type IAction = {
  action: string;
  handler: () => void;
};
export class EventBus {
  private targetOrigin = "";
  private events: { [event: string]: any[] } = {};
  private static instance: EventBus | null = null;
  private hasInit = false;
  constructor(targetOrigin: string) {
    if (EventBus.instance) {
      return EventBus.instance;
    }
    this.targetOrigin = targetOrigin;
    this.events = {};
    EventBus.instance = this;
  }

  getInstance(): { [event: string]: any[] } {
    return this.events;
  }

  private handler(event: MessageEvent): void {
    if (event.origin !== Env.MICRO_FRONTEND_URL.DESIGN_BOARD) {
      return;
    }

    console.log("RECEIVE FROM CLIENT", event);

    if (event && event.data && event.data.action) {
      if (this.events[event.data.action]) {
        this.events[event.data.action].forEach((callback) =>
          callback(event.data.data)
        );
      }
    }
  }

  init(exit = 0): void {
    if (!this.hasInit) {
      const callBack = (event: any) => this.handler(event);
      window.addEventListener("message", callBack);
      if (exit === -1) {
        window.removeEventListener("message", callBack);
      }
    }
    this.hasInit = true;
  }

  on(event: string, callback: () => void): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    if (!this.events[event].includes(callback)) {
      this.events[event].push(callback);
    }
  }

  off(event: string, callback: () => void): void {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }

  offById(event: string, id: string) {
    this.events[event] = this.events[event].filter((cb) => cb.id !== id);
  }

  emit(action: string, data: any, contentWindow: any): void {
    console.log("EMIT SUCCESS", action, data);
    if (contentWindow) {
      contentWindow.postMessage({ action, data }, this.targetOrigin);
    }
  }
}

// Example usage:

const targetOrigin = "http://127.0.0.1:3003";
const eventBus = new EventBus(Env.MICRO_FRONTEND_URL.DESIGN_BOARD);
eventBus.init();
