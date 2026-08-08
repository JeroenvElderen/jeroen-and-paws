import { z } from "zod";

export const mobileAppSchema = z.object({
  platform: z.enum(["android", "ios"]),
  enabled: z.boolean(),
  version: z.string().trim().max(50),
  build: z.number().int().nonnegative().nullable(),
  release_notes: z.string().trim().max(5000),
  download_url: z.union([z.url(), z.literal("")]),
  store_url: z.union([z.url(), z.literal("")]),
});

export type MobileAppInput = z.infer<typeof mobileAppSchema>;
export type MobileApp = MobileAppInput & { id: string; updated_at: string };

export function preferredMobileAppUrl(app: MobileAppInput) {
  return app.store_url || app.download_url || null;
}
