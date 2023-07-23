import { Suspense, useState } from "react";
import Routes from "@/routes";
if (typeof window.global === "undefined") window.global = window;

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes />
    </Suspense>
  );
}

export default App;
