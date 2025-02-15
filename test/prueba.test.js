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
    expect(procesaDireccionViento(20)).toBe("Norte");
  });

  it('Debe devolver "Noreste" para 45 grados', () => {
    expect(procesaDireccionViento(45)).toBe("Noreste");
  });

  it('Debe devolver "Este" para 90 grados', () => {
    expect(procesaDireccionViento(90)).toBe("Este");
  });

  it('Debe devolver "Sureste" para 135 grados', () => {
    expect(procesaDireccionViento(135)).toBe("Sureste");
  });

  it('Debe devolver "Sur" para 180 grados', () => {
    expect(procesaDireccionViento(180)).toBe("Sur");
  });

  it('Debe devolver "Suroeste" para 225 grados', () => {
    expect(procesaDireccionViento(225)).toBe("Suroeste");
  });

  it('Debe devolver "Oeste" para 270 grados', () => {
    expect(procesaDireccionViento(270)).toBe("Oeste");
  });

  it('Debe devolver "Noroeste" para 315 grados', () => {
    expect(procesaDireccionViento(315)).toBe("Noroeste");
  });

  it('Debe devolver "Desconocido" para valores inválidos o fuera del rango', () => {
    expect(procesaDireccionViento(-10)).toBe("Desconocido");
    expect(procesaDireccionViento(400)).toBe("Desconocido");
    expect(procesaDireccionViento("texto")).toBe("Desconocido");
    expect(procesaDireccionViento(undefined)).toBe("Desconocido");
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
    fetch.mockRejectedValue(new Error("Error al obtener la información"));

    await expect(obtenInformacionMeteo(42.2576, -8.683)).rejects.toThrow(
      "Error al obtener la información"
    );
  });
});

describe("procesaCodigoTiempo", () => {
  const originalConsoleLog = console.log;
  let mockConsoleLog;

  beforeEach(() => {
    mockConsoleLog = jest.fn();
    console.log = mockConsoleLog;
  });

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  const casosDePrueba = [
    [0, "☀️ Cielo despejado"],
    [1, "🌤️ Principalmente despejado, parcialmente nublado y cubierto"],
    [2, "🌤️ Principalmente despejado, parcialmente nublado y cubierto"],
    [3, "🌤️ Principalmente despejado, parcialmente nublado y cubierto"],
    [45, "🌫️ Niebla y niebla con escarcha"],
    [48, "🌫️ Niebla y niebla con escarcha"],
    [51, "🌧️ Llovizna: Intensidad ligera, moderada y densa"],
    [53, "🌧️ Llovizna: Intensidad ligera, moderada y densa"],
    [55, "🌧️ Llovizna: Intensidad ligera, moderada y densa"],
    [56, "❄️🌧️ Llovizna helada: Intensidad ligera y densa"],
    [57, "❄️🌧️ Llovizna helada: Intensidad ligera y densa"],
    [61, "🌧️ Lluvia: Intensidad ligera, moderada y fuerte"],
    [63, "🌧️ Lluvia: Intensidad ligera, moderada y fuerte"],
    [65, "🌧️ Lluvia: Intensidad ligera, moderada y fuerte"],
    [66, "❄️🌧️ Lluvia helada: Intensidad ligera y fuerte"],
    [67, "❄️🌧️ Lluvia helada: Intensidad ligera y fuerte"],
    [71, "❄️ Caída de nieve: Intensidad ligera, moderada y fuerte"],
    [73, "❄️ Caída de nieve: Intensidad ligera, moderada y fuerte"],
    [75, "❄️ Caída de nieve: Intensidad ligera, moderada y fuerte"],
    [77, "🌨️ Granizos de nieve"],
    [80, "🌦️ Chubascos: Intensidad ligera, moderada y violenta"],
    [81, "🌦️ Chubascos: Intensidad ligera, moderada y violenta"],
    [82, "🌦️ Chubascos: Intensidad ligera, moderada y violenta"],
    [85, "❄️🌨️ Chubascos de nieve: Intensidad ligera y fuerte"],
    [86, "❄️🌨️ Chubascos de nieve: Intensidad ligera y fuerte"],
    [95, "⛈️ Tormenta: Intensidad ligera o moderada"],
    [96, "⛈️🌩️ Tormenta con granizo: Intensidad ligera y fuerte"],
    [99, "⛈️🌩️ Tormenta con granizo: Intensidad ligera y fuerte"],
  ];

  test.each(casosDePrueba)(
    "para código de tiempo %i debe mostrar '%s'",
    (codigo, mensajeEsperado) => {
      procesaCodigoTiempo(codigo);
      expect(mockConsoleLog).toHaveBeenCalledWith(mensajeEsperado);
    }
  );

  test("Debe mostrar '❓ Código de tiempo no reconocido' para un código desconocido", () => {
    procesaCodigoTiempo(999);
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "❓ Código de tiempo no reconocido"
    );
  });
});

describe("muestraInformacionMeteo", () => {
  const originalConsoleLog = console.log;
  let mockConsoleLog;

  beforeEach(() => {
    mockConsoleLog = jest.fn();
    console.log = mockConsoleLog;
  });

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  test("Debe imprimir la información meteorológica correctamente", () => {
    const temperatura = "15 °C";
    const velocidadViento = "10 km/h";
    const direccionViento = "90° Este";
    const codigoTiempo = 1;

    muestraInformacionMeteo(temperatura, velocidadViento, direccionViento, codigoTiempo);

    expect(mockConsoleLog).toHaveBeenCalledWith(`Temperatura: ${temperatura}`);
    expect(mockConsoleLog).toHaveBeenCalledWith(`Velocidad del viento: ${velocidadViento}`);
    expect(mockConsoleLog).toHaveBeenCalledWith(`Dirección del viento: ${direccionViento}`);
    expect(mockConsoleLog).toHaveBeenCalledWith("🌤️ Principalmente despejado, parcialmente nublado y cubierto");
  });
});

