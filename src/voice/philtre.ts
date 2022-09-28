/**
 * Microsoft Azure Cognitive Speech to Text API tends to hear "philtre" (love potion)
 * instead of "filter" with French and Italian people speaking English.
 *
 * This is a bit funny but also confusing GPT-3. So we replace it.
 */

export default function philtre(text: string): string {
  // We just replace "philtre" by "filter" in the text
  // And a few variations (that I havn't seen often, but anyway once we are writing a regex...)
  return text
    .replace(/(^|\s)(philt|fitt)(re|er)($|\s)/gi, '$1filter$4')
    // Also replace numbers that are interpreted as time
    .replace(/(\d):(\d)/g, '$1$2');
}
