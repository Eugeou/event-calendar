import React from "react";
import EventCalendar from "@/component/EventCalendar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-cyan-50">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-blue-500 text-center mb-4">Event Management</h1>
        <EventCalendar />
      </div>
    </main>
  );
}
