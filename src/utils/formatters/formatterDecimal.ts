export default function formatterDecimal(decimals: string) {
  return decimals.slice(0, decimals.indexOf(".") + 9);
}
