export function formatoCOP(valor: number): string {
  return "$" + valor.toLocaleString("es-CO")
}

export function formatoUSD(valor: number): string {
  return "USD $" + valor.toFixed(2)
}