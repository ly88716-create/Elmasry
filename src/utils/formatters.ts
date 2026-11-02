/**
 * Formats a number to Egyptian Arabic currency notation
 * Example: 850000 -> "850,000 جنيه مصري"
 */
export function formatCurrencyEGP(amount: number): string {
  if (isNaN(amount)) return '0 ج.م';
  return `${amount.toLocaleString('ar-EG')} ج.م`;
}

/**
 * Formats mileage with kilometers symbol
 * Example: 45000 -> "45,000 كم"
 */
export function formatMileage(km: number): string {
  if (isNaN(km)) return '0 كم';
  return `${km.toLocaleString('ar-EG')} كم`;
}

/**
 * Formats Egyptian date
 */
export function formatArabicDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

/**
 * Generates an encoded WhatsApp link with car inquiry or general showroom contact
 */
export function getWhatsAppCarInquiryLink(
  whatsappNumber: string,
  carName: string,
  carYear: number,
  carPrice: number
): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const message = `السلام عليكم ورحمة الله وبركاته،\nأنا مهتم بالاستفسار عن سيارة:\n🚘 ${carName} (موديل ${carYear})\n💰 السعر المعروض: ${formatCurrencyEGP(carPrice)}\nهل السيارة ما زالت متوفرة في معرض المصري موتورز؟`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a general showroom WhatsApp link
 */
export function getGeneralWhatsAppLink(whatsappNumber: string, customMessage?: string): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const defaultMsg = 'السلام عليكم ورحمة الله وبركاته، أود الاستفسار عن السيارات المتاحة في معرض المصري موتورز.';
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(customMessage || defaultMsg)}`;
}

/**
 * Generates WhatsApp link to reply to a customer inquiry
 */
export function getCustomerResponseWhatsAppLink(customerPhone: string, customerName: string, requestedCar: string): string {
  let cleanNumber = customerPhone.replace(/[^0-9]/g, '');
  // If starts with 01, add Egypt country code 20
  if (cleanNumber.startsWith('01')) {
    cleanNumber = '2' + cleanNumber;
  } else if (!cleanNumber.startsWith('20') && cleanNumber.length === 10) {
    cleanNumber = '20' + cleanNumber;
  }
  const message = `مرحباً يا ${customerName}،\nمعك معرض المصري موتورز بخصوص طلبك لسيارة (${requestedCar}).\nيسعدنا تواصلك وتقديم أفضل العروض المتاحة لدينا.`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
