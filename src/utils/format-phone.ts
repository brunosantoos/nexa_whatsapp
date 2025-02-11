export function formatPhone(phone: string): string {
  const cleanNumber = phone.replace(/\D/g, "");

  if (!cleanNumber.startsWith("55")) {
    return `55${cleanNumber}`;
  }

  return cleanNumber;
}
