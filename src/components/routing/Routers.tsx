import { Navigate, Route, Routes } from "react-router-dom";
import Add from "../add-branch/Add";
import Home from "../home/Home";
import Update from "../update-customer/Update";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/branch" />} />
      <Route path="/branch" element={<Home />} />
      <Route path="/add-branch" element={<Add />} />
      <Route path="/update-customer" element={<Update />} />
    </Routes>
  );
}
