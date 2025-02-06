import { pipeline } from "@huggingface/transformers";

export async function analyzeImage(imageUrl: string): Promise<string[]> {
  try {
    // Create image classification pipeline
    const classifier = await pipeline(
      "image-classification",
      "microsoft/resnet-50",
      { quantized: true }
    );

    // Analyze the image
    const results = await classifier(imageUrl);

    // Convert classification results into goal suggestions
    const suggestions = results.slice(0, 3).map(result => {
      const activity = result.label.split(',')[0].toLowerCase();
      return `Focus on ${activity}-related activities to enhance your lifestyle`;
    });

    return suggestions;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error("Failed to analyze image");
  }
}