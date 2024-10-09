"use client";
// pages/index.tsx
import { useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
} from "react-flow-renderer";

// Definición del tipo de aplicación
interface Application {
  id: number;
  name: string;
  type: string;
  icon: string;
}

// Lista de aplicaciones
const applications: Application[] = [
  { id: 1, name: "Watson Discovery", type: "database", icon: "🔍" },
  { id: 2, name: "Elasticsearch", type: "search", icon: "🔎" },
  { id: 3, name: "MongoDB", type: "database", icon: "🍃" },
  { id: 4, name: "Redis", type: "cache", icon: "🔴" },
  { id: 5, name: "PostgreSQL", type: "database", icon: "🐘" },
  { id: 6, name: "RabbitMQ", type: "message-queue", icon: "🐰" },
];

const FlowPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [selectedApp, setSelectedApp] = useState<number | null>(null); // Aplicación seleccionada

  const addNode = (app: Application) => {
    const newNode: Node = {
      id: `${app.id}-${nodes.length}`, // Asegura que cada nodo tenga un ID único
      data: { label: `${app.icon} ${app.name}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // Posición aleatoria
      style: {
        border: "1px solid #777",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#007BFF", // Color azul más bonito
        color: "white", // Color del texto
      },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
    setSelectedApp(null); // Reiniciar selección después de agregar el nodo
  };

  const onConnect = (params: Connection) => {
    // Verificar que params.source y params.target no sean nulos
    if (params.source && params.target) {
      const edge: Edge = {
        id: `${params.source}-${params.target}`, // Generar ID único para el borde
        source: params.source,
        target: params.target,
        animated: true, // Puedes cambiar a false si no deseas que sea animado
      };

      setEdges((eds) => [...eds, edge]); // Agregar un nuevo borde
    } else {
      console.error("Source or target is null", params);
    }
  };

  const generateNotebook = () => {
    // Lógica para generar un notebook (actualmente solo imprime los nodos en la consola)
    console.log("Generando Notebook con los siguientes nodos:");
    console.log(nodes);
  };

  const createJob = () => {
    // Lógica para crear un job
    console.log("Creando job con los siguientes nodos:");
    console.log(nodes);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ marginBottom: "10px", position: "relative" }}>
        <select
          value={selectedApp || ""}
          onChange={(e) => setSelectedApp(Number(e.target.value))}
          style={{
            fontSize: "16px", // Aumentar tamaño de fuente
            padding: "8px", // Espaciado interno
            borderRadius: "5px", // Bordes redondeados
            border: "1px solid #777",
            color: "black", // Color del texto
            backgroundColor: "#f0f0f0", // Color de fondo
          }}
        >
          <option value="">Select an application</option>
          {applications.map((app) => (
            <option key={app.id} value={app.id}>
              {app.icon} {app.name} ({app.type}) {/* Mostrar el tipo */}
            </option>
          ))}
        </select>
        <button 
          onClick={() => {
            if (selectedApp) {
              const app = applications.find(a => a.id === selectedApp);
              if (app) { // Verificar que se encontró la aplicación
                addNode(app);
              }
            }
          }} 
          style={{ 
            fontSize: "16px", // Tamaño de fuente del botón
            padding: "8px 16px",
            borderRadius: "5px",
            border: "1px solid #777",
            backgroundColor: "#28a745", // Color verde para el botón de agregar
            color: "white", // Color del texto
            marginLeft: "10px", // Espacio entre el select y el botón
            cursor: "pointer",
          }}>
          Add Node
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect} // Habilita la conexión entre nodos
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      <button 
        onClick={generateNotebook} 
        style={{ 
          marginTop: "20px", // Espacio entre el flujo y el botón
          fontSize: "16px", // Tamaño de fuente del botón
          padding: "10px 20px",
          borderRadius: "5px",
          border: "1px solid #777",
          backgroundColor: "#007BFF", // Color azul para el botón de generar notebook
          color: "white", // Color del texto
          cursor: "pointer",
        }}>
        Generar Notebook
      </button>
    </div>
  );
};

export default FlowPage;
