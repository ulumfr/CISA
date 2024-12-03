import request from "supertest";
import app from "../server";
import { generateMockToken } from "./mockToken";

describe("DELETE /informasi/:id", () => {
  let token: string;

  beforeAll(() => {
    token = generateMockToken({
      id: 1,
      sekolahId: 1,
      role: "admin",
      namaSekolah: "TPA Cita Sakinah",
    });
  });

  it("Delete Berhasil", async () => {
    const response = await request(app)
      .delete("/api/informasi/52")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({message: "Informasi berhasil dihapus"});
  });
});
