import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resume from "./pages/Resume";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}