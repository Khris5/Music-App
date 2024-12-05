import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Launch from "./pages/Launch/Launch";
import Welcome from "./pages/Welcome/Welcome";
import Home from "./pages/Home/Home";
import Callback from "./components/callback/Callback";
import { ApiProvider } from "./ApiContext/Apicontext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          {/* <Route path="/" element={<Launch />} /> */}
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;
