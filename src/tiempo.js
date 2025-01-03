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
