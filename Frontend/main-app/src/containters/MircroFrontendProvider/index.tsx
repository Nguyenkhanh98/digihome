import React, { useEffect, useState } from "react";
import eventBus from "./EventBus";

const MicrofrontendComponent = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Listen for a custom event from the event bus
    const listener = (data) => {
      setMessage(data.message);
    };
    eventBus.on("customEvent", listener);

    // Cleanup the event listener when the component unmounts
    return () => {
      eventBus.off("customEvent", listener);
    };
  }, []);

  const handleButtonClick = () => {
    // Emit a custom event with data to be received by other components
    eventBus.emit("customEvent", { message: "Hello from Microfrontend A!" });
  };

  return (
    <div>
      <h1>Microfrontend Component A</h1>
      <button onClick={handleButtonClick}>Send Event</button>
      <p>Received message: {message}</p>
    </div>
  );
};

export default MicrofrontendComponent;
