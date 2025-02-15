export function procesaDireccionViento(direccionVientoGrados) {
  const grados = Number(direccionVientoGrados);
  if (isNaN(grados) || grados < 0 || grados > 360) {
    return "Desconocido";
  }

  switch (true) {
    case (grados >= 337.5 || grados < 22.5):
      return "Norte";
    case (grados >= 22.5 && grados < 67.5):
      return "Noreste";
    case (grados >= 67.5 && grados < 112.5):
      return "Este";
    case (grados >= 112.5 && grados < 157.5):
      return "Sureste";
    case (grados >= 157.5 && grados < 202.5):
      return "Sur";
    case (grados >= 202.5 && grados < 247.5):
      return "Suroeste";
    case (grados >= 247.5 && grados < 292.5):
      return "Oeste";
    case (grados >= 292.5 && grados < 337.5):
      return "Noroeste";
  }
};
