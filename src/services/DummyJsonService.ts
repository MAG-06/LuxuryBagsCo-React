export interface DummyJsonQuote {
  text: string
  author: string
}

export class DummyJsonService {

  async traducirTexto(texto: string): Promise<string> {

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|es`
    )

    const data = await response.json()

    return data.responseData.translatedText
  }

  async obtenerFrase(): Promise<DummyJsonQuote> {

    try {

      const response = await fetch(
        "https://dummyjson.com/quotes/random"
      )

      if (!response.ok) {
        throw new Error("Error en DummyJSON API")
      }

      const data = await response.json()

      const fraseTraducida =
        await this.traducirTexto(data.quote)

      return {
        text: fraseTraducida,
        author: data.author,
      }

    } catch (error) {

      console.error(
        "Error obteniendo frase:",
        error
      )

      return {
        text:
          "El lujo no es llamar la atención, es ser inolvidable.",
        author: "Luxury Bags Co",
      }
    }
  }
}