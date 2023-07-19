

let targetOrigin  ='http://localhost:5173';
class EventBus  {
    constructor(tartgetOrigin){
        if (EventBus.instance) {
            return EventBus.instance;
        }
        this.targetOrigin = tartgetOrigin;
        this.events = {};
        EventBus.instance = this;
    }
    getInstance(){
        return this.events;
    }
    handler (t) {
      console.log('REVEIVE FROM PARENT', event);
      if (event && event.data && event.data.action){
        console.log(t.events);
        if (t.events[event.data.action]) {
          t.events[event.data.action].forEach(callback => callback());
        }
      }
    }           

    init () {
       window.addEventListener("message", ()=>  this.handler(this));
    }

     on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

   off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }

   emit(action, data) {
    console.log('EMIT SUCCESS',action,data)
    window.parent.postMessage({action, data},this.targetOrigin)
  }
}

$(document).ready(function() {
    const eventBus = new EventBus(targetOrigin);
    eventBus.init();
    window.eventBus = eventBus;
})

