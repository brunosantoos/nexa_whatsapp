export function formatFirstName(fullName: string): string {
  const parts = fullName.split(' ');
  if (parts.length > 0) {
    const firstName =
      parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
    return firstName;
  }
  return '';
}
