import { procesaDireccionViento } from "../src/utils.js";

describe("procesaDireccionViento", () => {
  test("devuelve 'Norte' para 0 grados", () => {
    expect(procesaDireccionViento(0)).toBe("Norte");
  });

  test("devuelve 'Este' para 90 grados", () => {
    expect(procesaDireccionViento(90)).toBe("Este");
  });
});
