import { getNews, getGuides, getSubscribers } from "./db";
import { invokeLLM } from "./_core/llm";

/**
 * Generate a weekly newsletter digest with curated news and guides
 */
async function generateWeeklyDigest() {
  try {
    console.log("[Newsletter] Generating weekly digest...");

    // Fetch recent news and guides
    const recentNews = await getNews(10, 0);
    const recentGuides = await getGuides(5, 0);

    if (!recentNews || !recentGuides) {
      throw new Error("Failed to fetch news or guides");
    }

    // Use LLM to create a compelling newsletter summary
    const newsContent = recentNews
      .map((n) => `- ${n.title}\n  ${n.summary}`)
      .join("\n\n");

    const guidesContent = recentGuides
      .map((g) => `- ${g.title}`)
      .join("\n");

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are a professional newsletter writer for OnlyPayments, a payments intelligence platform for Latin America.
          
Your task is to create a compelling weekly newsletter digest that:
1. Summarizes the top news stories from the payments ecosystem in LATAM
2. Highlights the most important guides and resources
3. Includes actionable insights for readers
4. Maintains a professional but engaging tone
5. Uses markdown formatting with clear sections

The newsletter should be structured as:
- A catchy subject line
- A brief intro paragraph
- Top News section (with 3-5 key stories)
- Featured Guides section
- A call-to-action footer

Make it compelling and worth reading!`,
        },
        {
          role: "user",
          content: `Please create a weekly newsletter digest with this content:

## Recent News:
${newsContent}

## Recent Guides:
${guidesContent}

Generate the complete newsletter in markdown format.`,
        },
      ],
    });

    // Extract newsletter content
    let newsletterContent = "";
    if (typeof response === "string") {
      newsletterContent = response;
    } else if (response && typeof response === "object" && "text" in response) {
      newsletterContent = (response as { text: string }).text;
    } else if (Array.isArray(response)) {
      const firstItem = response[0];
      if (typeof firstItem === "string") {
        newsletterContent = firstItem;
      } else if (firstItem && typeof firstItem === "object" && "text" in firstItem) {
        newsletterContent = (firstItem as { text: string }).text;
      }
    }

    return newsletterContent;
  } catch (error) {
    console.error("[Newsletter] Error generating digest:", error);
    throw error;
  }
}

/**
 * Send newsletter to all active subscribers
 * In production, this would integrate with an email service (SendGrid, Mailgun, etc.)
 */
async function sendNewsletterToSubscribers(content: string) {
  try {
    console.log("[Newsletter] Fetching subscribers...");

    const subscribers = await getSubscribers();

    if (!subscribers || subscribers.length === 0) {
      console.log("[Newsletter] No active subscribers found");
      return {
        sent: 0,
        failed: 0,
        skipped: subscribers?.length || 0,
      };
    }

    console.log(`[Newsletter] Sending to ${subscribers.length} subscribers...`);

    // In production, integrate with email service
    // For now, we'll log the action
    const results = {
      sent: 0,
      failed: 0,
      skipped: 0,
    };

    for (const subscriber of subscribers) {
      try {
        // TODO: Integrate with email service (SendGrid, Mailgun, etc.)
        // await emailService.send({
        //   to: subscriber.email,
        //   subject: "OnlyPayments Weekly Digest",
        //   html: markdownToHtml(content),
        // });

        console.log(`[Newsletter] Would send to: ${subscriber.email}`);
        results.sent++;
      } catch (error) {
        console.error(`[Newsletter] Failed to send to ${subscriber.email}:`, error);
        results.failed++;
      }
    }

    return results;
  } catch (error) {
    console.error("[Newsletter] Error sending newsletters:", error);
    throw error;
  }
}

/**
 * Main function to generate and send weekly newsletter
 */
export async function sendWeeklyNewsletter() {
  try {
    console.log(`[Newsletter] Starting weekly newsletter at ${new Date().toISOString()}`);

    // Generate the digest
    const content = await generateWeeklyDigest();

    // Send to subscribers
    const sendResults = await sendNewsletterToSubscribers(content);

    console.log("[Newsletter] Weekly newsletter sent successfully:", sendResults);

    return {
      ok: true,
      content,
      sendResults,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[Newsletter] Fatal error:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Scheduled handler for weekly newsletter
 * This function is called by the Heartbeat scheduler
 */
export async function handleWeeklyNewsletter() {
  return sendWeeklyNewsletter();
}
