import React, { createContext, useContext, useState } from "react";

const RequestContext = createContext();
let nextRequestId = 6;

const initialRequests = [
  { id: "r1", name: "Aarav Sharma", type: "call", message: "Need mentoring for maths, prefer 4pm", createdAt: "2025-10-01T10:20:00Z" },
  { id: "r2", name: "Meera Singh", type: "query", message: "Doubt in chemistry assignment.", createdAt: "2025-10-02T08:00:00Z" },
  { id: "r3", name: "Rohan Patel", type: "choice", message: "Help with choice filling for engineering streams.", createdAt: "2025-10-02T09:15:00Z" },
  { id: "r4", name: "Sana Khan", type: "call", message: "Available after 5pm for a call.", createdAt: "2025-10-02T12:00:00Z" },
  { id: "r5", name: "Vikram Gupta", type: "query", message: "Question about exam dates.", createdAt: "2025-10-03T06:40:00Z" }
];

export function RequestProvider({ children }) {
  const [requests, setRequests] = useState(initialRequests);

  const addRequest = (type, studentId, message) => {
    const newRequest = {
      id: `r${nextRequestId++}`,
      name: studentId.toUpperCase(),
      type,
      message,
      createdAt: new Date().toISOString(),
    };
    setRequests(prev => [...prev, newRequest]);
  };

  const resolveRequest = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <RequestContext.Provider value={{ requests, addRequest, resolveRequest }}>
      {children}
    </RequestContext.Provider>
  );
}

export function useRequests() {
  return useContext(RequestContext);
}
