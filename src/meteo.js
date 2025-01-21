export function procesaCodigoTiempo(codigoTiempo) {
  switch (codigoTiempo) {
    case 0:
      return "☀️ Cielo despejado";
    case 1:
    case 2:
    case 3:
      return "🌤️ Principalmente despejado, parcialmente nublado y cubierto";
    case 45:
    case 48:
      return "🌫️ Niebla y niebla con escarcha";
    case 51:
    case 53:
    case 55:
      return "🌧️ Llovizna: Intensidad ligera, moderada y densa";
    case 56:
    case 57:
      return "❄️🌧️ Llovizna helada: Intensidad ligera y densa";
    case 61:
    case 63:
    case 65:
      return "🌧️ Lluvia: Intensidad ligera, moderada y fuerte";
    case 66:
    case 67:
      return "❄️🌧️ Lluvia helada: Intensidad ligera y fuerte";
    case 71:
    case 73:
    case 75:
      return "❄️ Caída de nieve: Intensidad ligera, moderada y fuerte";
    case 77:
      return "🌨️ Granizos de nieve";
    case 80:
    case 81:
    case 82:
      return "🌦️ Chubascos: Intensidad ligera, moderada y violenta";
    case 85:
    case 86:
      return "❄️🌨️ Chubascos de nieve: Intensidad ligera y fuerte";
    case 95:
      return "⛈️ Tormenta: Intensidad ligera o moderada";
    case 96:
    case 99:
      return "⛈️🌩️ Tormenta con granizo: Intensidad ligera y fuerte";
    default:
      return "❓ Código de tiempo no reconocido";
  }
}

export function muestraInformacionMeteo(
  temperatura,
  velocidadViento,
  direccionViento,
  codigoTiempo
) {
  console.log(`Temperatura: ${temperatura}`);
  console.log(`Velocidad del viento: ${velocidadViento}`);
  console.log(`Dirección del viento: ${direccionViento}`);
  console.log(procesaCodigoTiempo(codigoTiempo));
}
