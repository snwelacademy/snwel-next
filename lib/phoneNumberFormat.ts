export function formatIndianPhoneNumber(phoneNumber: string) {
    // Remove any non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
  
    // Check if the number is in international format (starts with +91 or 91)
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
      return '+91 ' + cleaned.slice(2, 7) + ' ' + cleaned.slice(7);
    }
  
    // Check if it's a valid 10-digit phone number
    if (cleaned.length === 10) {
      return cleaned.slice(0, 5) + ' ' + cleaned.slice(5);
    }
  
    // If not valid, return the original input
    return phoneNumber;
  }
  
  