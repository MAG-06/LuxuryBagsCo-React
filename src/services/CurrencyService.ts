export class CurrencyService {
  private API_URL = "https://open.er-api.com/v6/latest/USD"

  async obtenerTasaUSDaCOP(): Promise<number> {
    const response = await fetch(this.API_URL)

    if (!response.ok) {
      throw new Error("Error consultando la API de moneda")
    }

    const data = await response.json()

    return data.rates.COP
  }

  convertirCOPaUSD(precioCOP: number, tasaCOP: number): number {
    return precioCOP / tasaCOP
  }
}