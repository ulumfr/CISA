import request from "supertest";
import app from "./setupTest";
import { generateMockToken } from "./mockToken";

describe("Fitur Auth - Login", () => {
  it("Login dengan semua data kosong", async () => {
    const response = await request(app)
      .post("/api/user/auth/login")
      .send({ username: "", password: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Username dan Password wajib diisi");
  });

  it("Login dengan username salah", async () => {
    const response = await request(app)
      .post("/api/user/auth/login")
      .send({ username: "usernamesalah", password: "adminTPA2024" });

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual("User tidak ditemukan");
  });

  it("Login dengan password salah", async () => {
    const response = await request(app)
      .post("/api/user/auth/login")
      .send({ username: "adminTPA", password: "passwordsalah" });

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Password salah");
  });

  it("Login dengan data valid", async () => {
    const response = await request(app)
      .post("/api/user/auth/login")
      .send({ username: "adminTPA", password: "adminTPA2024" });

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Login berhasil");
  });
});

describe("Fitur Auth - Logout", () => {
  let token: string;

  beforeAll(() => {
    token = generateMockToken({
      id: 1,
      sekolahId: 1,
      role: "admin",
      namaSekolah: "TPA Cita Sakinah",
    });
  });

  it("Logout berhasil", async () => {
    const response = await request(app)
      .post("/api/user/logout")
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Logout berhasil");
  });
});
