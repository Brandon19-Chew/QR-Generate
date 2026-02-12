import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertQrCode } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useQrCodes() {
  return useQuery({
    queryKey: [api.qrCodes.list.path],
    queryFn: async () => {
      const res = await fetch(api.qrCodes.list.path);
      if (!res.ok) throw new Error("Failed to fetch history");
      return api.qrCodes.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateQrCode() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertQrCode) => {
      const res = await fetch(api.qrCodes.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save QR code");
      return api.qrCodes.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.qrCodes.list.path] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save QR code to history.",
      });
    },
  });
}

export function useDeleteQrCode() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.qrCodes.delete.path, { id });
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete QR code");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.qrCodes.list.path] });
      toast({
        title: "Deleted",
        description: "QR code removed from history.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete QR code.",
      });
    },
  });
}
