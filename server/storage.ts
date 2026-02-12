import { db } from "./db";
import { qrCodes, type InsertQrCode, type QrCode } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
    createQrCode(qrCode: InsertQrCode): Promise<QrCode>;
  getQrCodes(): Promise<QrCode[]>;
  deleteQrCode(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createQrCode(insertQrCode: InsertQrCode): Promise<QrCode> {
    const [qrCode] = await db
      .insert(qrCodes)
      .values(insertQrCode)
      .returning();
    return qrCode;
  }

 async getQrCodes(): Promise<QrCode[]> {
    return await db
      .select()
      .from(qrCodes)
      .orderBy(desc(qrCodes.createdAt));
  }

async deleteQrCode(id: number): Promise<void> {
    await db.delete(qrCodes).where(eq(qrCodes.id, id));
  }
}

export const storage = new DatabaseStorage();
