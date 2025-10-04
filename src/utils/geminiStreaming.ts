export async function generateWithProgress(
  apiKey: string,
  prompt: string,
  onProgress: (percentage: number) => void,
  onComplete: (fullText: string) => void,
  onError: (error: Error) => void
) {
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  try {
    onProgress(10);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });

    onProgress(50);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    onProgress(90);

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("No text content in response");
    }

    onProgress(100);
    onComplete(text);
  } catch (error) {
    onError(error instanceof Error ? error : new Error('Unknown error occurred'));
  }
}
