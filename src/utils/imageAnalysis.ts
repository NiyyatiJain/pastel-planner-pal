import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to use browser environment
env.allowLocalModels = false;
env.useBrowserCache = true;

export async function analyzeImage(imageUrl: string): Promise<string[]> {
  try {
    console.log('Creating image classification pipeline...');
    
    // Use a model that's optimized for browser environments
    const classifier = await pipeline(
      "image-classification",
      "Xenova/vit-base-patch16-224",
      { 
        quantized: false,
        device: 'cpu'
      }
    );

    console.log('Analyzing image...');
    const results = await classifier(imageUrl, {
      topk: 5
    });

    console.log('Classification results:', results);

    // Convert classification results into goal suggestions
    const suggestions = results
      .slice(0, 3)
      .map(result => {
        const label = result.label
          .split('_')
          .join(' ')
          .toLowerCase();
        return `Focus on ${label}-related activities to enhance your lifestyle`;
      });

    return suggestions;
  } catch (error) {
    console.error('Error in image analysis:', error);
    throw new Error('Failed to analyze image');
  }
}