import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
   app.get(api.qrCodes.list.path, async (req, res) => {
    const codes = await storage.getQrCodes();
    res.json(codes);
  });
    app.post(api.qrCodes.create.path, async (req, res) => {
    try {
      const input = api.qrCodes.create.input.parse(req.body);
      const code = await storage.createQrCode(input);
      res.status(201).json(code);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  app.delete(api.qrCodes.delete.path, async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    await storage.deleteQrCode(id);
    res.status(204).send();
  });
  return httpServer;
}
