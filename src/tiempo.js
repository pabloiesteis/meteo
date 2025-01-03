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