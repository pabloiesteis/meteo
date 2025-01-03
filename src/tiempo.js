import fetch from "node-fetch";

// Añadimos las coordenadas de Teis
const teisLatitud = 42.2576;
const teisLongitud = -8.683;

// Obtenemos información de la API
const obtenInformacionMeteo = async (latitud, longitud) => {
  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true`;
  const respuestaAPI = await fetch(apiURL);
  const respuestaAPIenJSON = await respuestaAPI.json();
  return respuestaAPIenJSON;
};

var respuesta = await obtenInformacionMeteo(teisLatitud, teisLongitud);

// Procesamiento de datos meteorológicos
const temperatura = `${respuesta.current_weather.temperature} ${respuesta.current_weather_units.temperature}`;
const velocidadViento = `${respuesta.current_weather.windspeed} ${respuesta.current_weather_units.windspeed}`;
const direccionVientoGrados = respuesta.current_weather.winddirection;
const codigoTiempo = respuesta.current_weather.weathercode;

// Procesamiento de datos de dirección del viento
function procesaDireccionViento(direccionVientoGrados) {
  const grados = Number(direccionVientoGrados);

  var direccion = "";

  if (grados >= 337.5 || grados < 22.5) {
    direccion = "Norte";
  } else if (grados >= 22.5 && grados < 67.5) {
    direccion = "Noreste";
  } else if (grados >= 67.5 && grados < 112.5) {
    direccion = "Este";
  } else if (grados >= 112.5 && grados < 157.5) {
    direccion = "Sureste";
  } else if (grados >= 157.5 && grados < 202.5) {
    direccion = "Sur";
  } else if (grados >= 202.5 && grados < 247.5) {
    direccion = "Suroeste";
  } else if (grados >= 247.5 && grados < 292.5) {
    direccion = "Oeste";
  } else if (grados >= 292.5 && grados < 337.5) {
    direccion = "Noroeste";
  }

  return direccion;
}

const direccionViento = `${direccionVientoGrados}${respuesta.current_weather_units.winddirection} ${procesaDireccionViento(direccionVientoGrados)}`;

// Procesamiento de codigos de tiempo
function procesaCodigoTiempo(codigoTiempo) {
  switch (codigoTiempo) {
    case 0:
      console.log("☀️ Cielo despejado");
      break;
    case 1:
    case 2:
    case 3:
      console.log(
        "🌤️ Principalmente despejado, parcialmente nublado y cubierto"
      );
      break;
    case 45:
    case 48:
      console.log("🌫️ Niebla y niebla con escarcha");
      break;
    case 51:
    case 53:
    case 55:
      console.log("🌧️ Llovizna: Intensidad ligera, moderada y densa");
      break;
    case 56:
    case 57:
      console.log("❄️🌧️ Llovizna helada: Intensidad ligera y densa");
      break;
    case 61:
    case 63:
    case 65:
      console.log("🌧️ Lluvia: Intensidad ligera, moderada y fuerte");
      break;
    case 66:
    case 67:
      console.log("❄️🌧️ Lluvia helada: Intensidad ligera y fuerte");
      break;
    case 71:
    case 73:
    case 75:
      console.log("❄️ Caída de nieve: Intensidad ligera, moderada y fuerte");
      break;
    case 77:
      console.log("🌨️ Granizos de nieve");
      break;
    case 80:
    case 81:
    case 82:
      console.log("🌦️ Chubascos: Intensidad ligera, moderada y violenta");
      break;
    case 85:
    case 86:
      console.log("❄️🌨️ Chubascos de nieve: Intensidad ligera y fuerte");
      break;
    case 95:
      console.log("⛈️ Tormenta: Intensidad ligera o moderada");
      break;
    case 96:
    case 99:
      console.log("⛈️🌩️ Tormenta con granizo: Intensidad ligera y fuerte");
      break;
    default:
      console.log("❓ Código de tiempo no reconocido");
  }
}

// Mostramos la información procesada
function muestraInformacionMeteo(temperatura, velocidadViento, direccionViento, codigoTiempo) {
  console.log(`Temperatura: ${temperatura}`);
  console.log(`Velocidad del viento: ${velocidadViento}`);
  console.log(`Dirección del viento: ${direccionViento}`);
  procesaCodigoTiempo(codigoTiempo);
}


muestraInformacionMeteo(
  temperatura,
  velocidadViento,
  direccionViento,
  codigoTiempo
);