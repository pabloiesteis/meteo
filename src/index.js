import { obtenInformacionMeteo } from "./api.js";
import { procesaDireccionViento } from "./utils.js";
import { muestraInformacionMeteo } from "./meteo.js";

const teisLatitud = 42.2576;
const teisLongitud = -8.683;

(async () => {
  try {
    const respuesta = await obtenInformacionMeteo(teisLatitud, teisLongitud);

    const temperatura = `${respuesta.current_weather.temperature} ${respuesta.current_weather_units.temperature}`;
    const velocidadViento = `${respuesta.current_weather.windspeed} ${respuesta.current_weather_units.windspeed}`;
    const direccionVientoGrados = respuesta.current_weather.winddirection;
    const codigoTiempo = respuesta.current_weather.weathercode;

    const direccionViento = `${direccionVientoGrados}${
      respuesta.current_weather_units.winddirection
    } ${procesaDireccionViento(direccionVientoGrados)}`;

    muestraInformacionMeteo(
      temperatura,
      velocidadViento,
      direccionViento,
      codigoTiempo
    );
  } catch (error) {
    console.error("Error al obtener la información meteorológica:", error);
  }
})();
