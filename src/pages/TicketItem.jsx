// src/components/TicketItem.jsx
import React from 'react';
import { Badge } from "@/components/ui/badge";

const TicketItem = ({ ticket }) => {
  const {
    app,
    subject,
    date,
    time,
    assignedTo,
    solved,
    imageUrl,
    status
  } = ticket;

  return (
    <div className="border rounded-xl p-4 shadow-md bg-background space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-primary">{subject}</h3>
        <Badge variant={solved ? "success" : "destructive"}>
          {solved ? "Resuelto" : "Pendiente"}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground"><strong>Aplicación:</strong> {app}</p>
      <p className="text-sm text-muted-foreground"><strong>Fecha:</strong> {date} — {time}</p>
      <p className="text-sm text-muted-foreground"><strong>Encargado:</strong> {assignedTo || "Sin asignar"}</p>

      {imageUrl && (
        <div className="mt-2">
          <img
            src={imageUrl}
            alt="Captura"
            className="max-h-48 w-auto rounded-md border"
          />
        </div>
      )}
    </div>
  );
};

export default TicketItem;
