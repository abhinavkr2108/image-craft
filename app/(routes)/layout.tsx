import Sidebar from "@/components/Sidebar";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="flex">
        <Sidebar />
        <div className="bg-gray-50 w-full h-screen p-5">{children}</div>
      </div>
    </React.Fragment>
  );
}
