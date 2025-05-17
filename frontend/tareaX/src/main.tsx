// main.tsx
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./components/Login.tsx";
import Subjects from "./pages/Subject/Subjects.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home/Home.tsx";
import Students from "./pages/Student/Students.tsx";
import Teachers from "./pages/Teacher/Teachers.tsx";
import Landing from "./pages/Landing/Landing.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="landing" element={<Landing />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
