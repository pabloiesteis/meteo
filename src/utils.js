export function procesaDireccionViento(direccionVientoGrados) {
  const grados = Number(direccionVientoGrados);
  if (grados >= 337.5 || grados < 22.5) return "Norte";
  if (grados >= 22.5 && grados < 67.5) return "Noreste";
  if (grados >= 67.5 && grados < 112.5) return "Este";
  if (grados >= 112.5 && grados < 157.5) return "Sureste";
  if (grados >= 157.5 && grados < 202.5) return "Sur";
  if (grados >= 202.5 && grados < 247.5) return "Suroeste";
  if (grados >= 247.5 && grados < 292.5) return "Oeste";
  if (grados >= 292.5 && grados < 337.5) return "Noroeste";
  return "Desconocido";
}
