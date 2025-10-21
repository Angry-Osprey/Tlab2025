// src/App.jsx
import { Outlet } from "react-router-dom";
import Portfolio from "./portfolio";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <main className="">
        {/* Home page (Portfolio) */}
        <Outlet />
      </main>
    </div>
  );
}
