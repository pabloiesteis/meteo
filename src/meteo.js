export function procesaCodigoTiempo(codigoTiempo) {
  switch (codigoTiempo) {
    case 0:
      console.log("☀️ Cielo despejado");
      return "☀️ Cielo despejado";
    case 1:
    case 2:
    case 3:
      console.log(
        "🌤️ Principalmente despejado, parcialmente nublado y cubierto"
      );
      return "🌤️ Principalmente despejado, parcialmente nublado y cubierto";
    case 45:
    case 48:
      console.log("🌫️ Niebla y niebla con escarcha");
      return "🌫️ Niebla y niebla con escarcha";
    case 51:
    case 53:
    case 55:
      console.log("🌧️ Llovizna: Intensidad ligera, moderada y densa");
      return "🌧️ Llovizna: Intensidad ligera, moderada y densa";
    case 56:
    case 57:
      console.log("❄️🌧️ Llovizna helada: Intensidad ligera y densa");
      return "❄️🌧️ Llovizna helada: Intensidad ligera y densa";
    case 61:
    case 63:
    case 65:
      console.log("🌧️ Lluvia: Intensidad ligera, moderada y fuerte");
      return "🌧️ Lluvia: Intensidad ligera, moderada y fuerte";
    case 66:
    case 67:
      console.log("❄️🌧️ Lluvia helada: Intensidad ligera y fuerte");
      return "❄️🌧️ Lluvia helada: Intensidad ligera y fuerte";
    case 71:
    case 73:
    case 75:
      console.log("❄️ Caída de nieve: Intensidad ligera, moderada y fuerte");
      return "❄️ Caída de nieve: Intensidad ligera, moderada y fuerte";
    case 77:
      console.log("🌨️ Granizos de nieve");
      return "🌨️ Granizos de nieve";
    case 80:
    case 81:
    case 82:
      console.log("🌦️ Chubascos: Intensidad ligera, moderada y violenta");
      return "🌦️ Chubascos: Intensidad ligera, moderada y violenta";
    case 85:
    case 86:
      console.log("❄️🌨️ Chubascos de nieve: Intensidad ligera y fuerte");
      return "❄️🌨️ Chubascos de nieve: Intensidad ligera y fuerte";
    case 95:
      console.log("⛈️ Tormenta: Intensidad ligera o moderada");
      return "⛈️ Tormenta: Intensidad ligera o moderada";
    case 96:
    case 99:
      console.log("⛈️🌩️ Tormenta con granizo: Intensidad ligera y fuerte");
      return "⛈️🌩️ Tormenta con granizo: Intensidad ligera y fuerte";
    default:
      console.log("❓ Código de tiempo no reconocido");
      return "❓ Código de tiempo no reconocido";
  }
}

procesaCodigoTiempo(0);

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
