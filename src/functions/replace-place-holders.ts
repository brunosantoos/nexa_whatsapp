export function replacePlaceholders(
  text: string,
  replacements: Record<string, string>
): string {
  for (const key in replacements) {
    const value = replacements[key];
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    text = text.replace(regex, value);
  }
  return text;
}
