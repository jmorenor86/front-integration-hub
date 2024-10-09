"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";

const applications = [
  { id: 1, name: "RAG Integration IBM", type: "RAG", icon: (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" // URL del logo de IBM
      alt="IBM Logo"
      style={{ width: "70px", height: "70px" }} // Ajusta el tamaño según sea necesario
    />
  ),},
  { id: 2, name: "Custom", type: "Integration", icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="Black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "70px", height: "70px" }}
    >
      <path d="M3 12h18M3 12l4-4m-4 4l4 4m2-4h6m-6 0l4-4m-4 4l4 4" />
    </svg>
  ), },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApps = applications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Integration Hub</h1>
      <input
        type="text"
        placeholder="Search templates..."
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApps.map((app) => (
          <Card key={app.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>{app.name}</CardTitle>
              <CardDescription>{app.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl mb-2">{app.icon}</div>
            </CardContent>
            <CardFooter>
              <Button>Configure</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
