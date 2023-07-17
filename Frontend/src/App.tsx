import { Suspense, useState } from "react";
import Routes from "@/routes";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes />
    </Suspense>
  );
}

export default App;
