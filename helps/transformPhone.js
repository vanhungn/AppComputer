function ToE164(phone, countryCode = "+84") {
  let cleaned = phone.replace(/\D/g, ""); // xóa ký tự không phải số

  if (cleaned.startsWith("0")) {
    return countryCode + cleaned.substring(1);
  }
  if (cleaned.startsWith("84")) {
    return "+" + cleaned;
  }
  if (cleaned.startsWith("+")) {
    return cleaned;
  }
  return countryCode + cleaned;
}
module.exports= ToE164