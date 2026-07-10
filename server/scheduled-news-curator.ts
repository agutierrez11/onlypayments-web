import { Request, Response } from "express";
import { handleDailyNewsCuration } from "./llm-news-curator";
import { sdk } from "./_core/sdk";

/**
 * Scheduled endpoint for daily news curation
 * Called by Heartbeat scheduler at configured intervals
 * 
 * Path: /api/scheduled/curateNews
 * Auth: Cron-only (user.isCron === true)
 */
export async function scheduledNewsCuratorHandler(req: Request, res: Response) {
  try {
    // Authenticate as cron-only request
    const user = await sdk.authenticateRequest(req);
    
    if (!user || !user.isCron) {
      return res.status(403).json({
        error: "cron-only",
        message: "This endpoint is only accessible from scheduled cron jobs",
      });
    }

    console.log(`[Scheduled News Curator] Cron job triggered at ${new Date().toISOString()}`);

    // Execute the news curation
    const result = await handleDailyNewsCuration();

    // Return success response
    return res.json({
      ok: result.ok,
      results: result.results || null,
      error: result.error || null,
      timestamp: result.timestamp,
    });
  } catch (error) {
    console.error("[Scheduled News Curator] Handler error:", error);

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
