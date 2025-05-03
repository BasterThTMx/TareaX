import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Login from "./components/Login.tsx";
import Tasks from "./pages/Student/Tasks.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Subjects from "./pages/Subject/Subjects.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/subjects" element={<Subjects />} />
    </Routes>
  </BrowserRouter>
);
