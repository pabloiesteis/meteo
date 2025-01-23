import { procesaDireccionViento } from "../src/utils.js";
import { muestraInformacionMeteo, procesaCodigoTiempo } from "../src/meteo.js";
import { obtenInformacionMeteo } from "../src/api.js";

jest.mock("node-fetch", () => jest.fn());
import fetch from "node-fetch";
const { Response } = jest.requireActual("node-fetch");

describe("procesaDireccionViento", () => {
  it('Debe devolver "Norte" para grados dentro del rango de 337.5 a 22.5', () => {
    expect(procesaDireccionViento(0)).toBe("Norte");
    expect(procesaDireccionViento(360)).toBe("Norte");
  });

  it('Debe devolver "Noreste" para grados dentro del rango de 22.5 a 67.5', () => {
    expect(procesaDireccionViento(45)).toBe("Noreste");
  });

  it('Debe devolver "Este" para grados dentro del rango de 67.5 a 112.5', () => {
    expect(procesaDireccionViento(90)).toBe("Este");
  });

  it('Debe devolver "Sur" para grados dentro del rango de 157.5 a 202.5', () => {
    expect(procesaDireccionViento(180)).toBe("Sur");
  });

  it('Debe devolver "Suroeste" para grados dentro del rango de 202.5 a 247.5', () => {
    expect(procesaDireccionViento(225)).toBe("Suroeste");
  });
});

describe("obtenInformacionMeteo", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("Debe devolver información de la API con una latitud y longitud válidas", async () => {
    const mockResponse = {
      current_weather: {
        temperature: 15,
        windspeed: 10,
        winddirection: 90,
        weathercode: 1,
      },
      current_weather_units: {
        temperature: "°C",
        windspeed: "km/h",
        winddirection: "°",
      },
    };

    fetch.mockResolvedValue(new Response(JSON.stringify(mockResponse)));

    const result = await obtenInformacionMeteo(42.2576, -8.683);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.open-meteo.com/v1/forecast?latitude=42.2576&longitude=-8.683&current_weather=true"
    );
    expect(result).toEqual(mockResponse);
  });

  it("Debe manejar errores de la API", async () => {
    fetch.mockRejectedValue(
      new Error("Error al obtener la información meteorológica: ")
    );

    await expect(obtenInformacionMeteo(42.2576, -8.683)).rejects.toThrow(
      "Error al obtener la información meteorológica: "
    );
  });
});

describe("procesaCodigoTiempo", () => {
  const originalConsoleLog = console.log;
  let mockConsoleLog;

  beforeEach(() => {
    // Reemplaza console.log con una función simulada (mock)
    mockConsoleLog = jest.fn();
    console.log = mockConsoleLog;
  });

  afterEach(() => {
    // Restaura console.log después de cada test
    console.log = originalConsoleLog;
  });

  test("debe mostrar '☀️ Cielo despejado' para el código 0", () => {
    procesaCodigoTiempo(0);
    expect(mockConsoleLog).toHaveBeenCalledWith("☀️ Cielo despejado");
  });

  test("debe mostrar '🌤️ Principalmente despejado...' para el código 1", () => {
    procesaCodigoTiempo(1);
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "🌤️ Principalmente despejado, parcialmente nublado y cubierto"
    );
  });

  test("debe mostrar '🌫️ Niebla...' para el código 45", () => {
    procesaCodigoTiempo(45);
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "🌫️ Niebla y niebla con escarcha"
    );
  });

  test("debe mostrar '🌧️ Lluvia...' para el código 61", () => {
    procesaCodigoTiempo(61);
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "🌧️ Lluvia: Intensidad ligera, moderada y fuerte"
    );
  });

  test("debe mostrar '⛈️ Tormenta...' para el código 95", () => {
    procesaCodigoTiempo(95);
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "⛈️ Tormenta: Intensidad ligera o moderada"
    );
  });

  test("debe mostrar '❓ Código de tiempo no reconocido' para un código no válido", () => {
    procesaCodigoTiempo(999);
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "❓ Código de tiempo no reconocido"
    );
  });
});
