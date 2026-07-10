import { Request, Response } from "express";
import { handleWeeklyNewsletter } from "./newsletter-sender";
import { sdk } from "./_core/sdk";

/**
 * Scheduled endpoint for weekly newsletter
 * Called by Heartbeat scheduler every Sunday at 9:00 AM UTC
 * 
 * Path: /api/scheduled/sendNewsletter
 * Auth: Cron-only (user.isCron === true)
 */
export async function scheduledNewsletterHandler(req: Request, res: Response) {
  try {
    // Authenticate as cron-only request
    const user = await sdk.authenticateRequest(req);

    if (!user || !user.isCron) {
      return res.status(403).json({
        error: "cron-only",
        message: "This endpoint is only accessible from scheduled cron jobs",
      });
    }

    console.log(`[Scheduled Newsletter] Cron job triggered at ${new Date().toISOString()}`);

    // Execute the newsletter sending
    const result = await handleWeeklyNewsletter();

    // Return success response
    return res.json({
      ok: result.ok,
      sendResults: result.sendResults || null,
      error: result.error || null,
      timestamp: result.timestamp,
    });
  } catch (error) {
    console.error("[Scheduled Newsletter] Handler error:", error);

    // Return error response in a format that Forge can investigate
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      context: {
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
  }
}
