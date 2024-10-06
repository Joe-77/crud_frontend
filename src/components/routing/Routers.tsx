import { Navigate, Route, Routes } from "react-router-dom";
import Add from "../add-branch/Add";
import Home from "../home/Home";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/branch" />} />
      <Route path="/branch" element={<Home />} />
      <Route path="/add-branch" element={<Add />} />
    </Routes>
  );
}
