export async function POST(req) {
  try {
    const { outfit } = await req.json();

    const prompt = `You are a fashion-forward sock sommelier. Give specific sock advice for this outfit.

Outfit:
- Top: ${outfit.top}
- Bottom: ${outfit.bottom}
- Shoes: ${outfit.shoes}
- Occasion: ${outfit.occasion}

Respond ONLY as valid JSON (no markdown, no backticks):
{
  "headline": "5-7 word punchy recommendation title",
  "primaryRecommendation": "2 sentences on best sock choice: color, length, fabric, pattern",
  "sockType": "one of: no-show, ankle, crew, dress, athletic, fun",
  "doThis": ["3 specific winning sock options"],
  "avoidThis": ["2 things to avoid with brief reason"],
  "boldMove": "One adventurous option to stand out",
  "sockEmoji": "1-2 emojis for this vibe",
  "confidenceLevel": "Conservative or Stylish or Bold",
  "tiktokCaption": "A fun 1-sentence TikTok caption about this sock choice under 100 chars"
}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const text = data.content?.find((b) => b.type === "text")?.text || "{}";
    const clean = text.replace(/```json|```/g, "").trim();
    const result = JSON.parse(clean);

    return Response.json({ success: true, result });
  } catch (error) {
    console.error("API error:", error);
    return Response.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
