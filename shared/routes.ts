import { z } from 'zod';
import { insertQrCodeSchema, qrCodes } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  qrCodes: {
    list: {
      method: 'GET' as const,
      path: '/api/qr-codes' as const,
      responses: {
        200: z.array(z.custom<typeof qrCodes.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/qr-codes' as const,
      input: insertQrCodeSchema,
      responses: {
        201: z.custom<typeof qrCodes.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/qr-codes/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
