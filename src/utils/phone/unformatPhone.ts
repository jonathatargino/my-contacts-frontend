export default function unformatPhone(phoneNumber: string) {
  return phoneNumber.replace(/\D/g, "");
}
