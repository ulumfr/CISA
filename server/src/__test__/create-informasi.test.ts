import request from "supertest";
import app from "../server";
import { generateMockToken } from "./mockToken";
import path from "path"; 

describe("POST /informasi", () => {
  let token: string;
  const endpoint = "/api/informasi";

  beforeAll(() => {
    token = generateMockToken({
      id: 1,
      sekolahId: 1,
      role: "admin",
      namaSekolah: "TPA Cita Sakinah",
    });
  });

  it("Create informasi dengan semua data kosong", async () => {
    const response = await request(app)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .field("judul", "")
      .field("deskripsi", "")
      .field("tanggal", "")
      .field("sekolahId", "");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Semua kolom harus diisi");
  });

  it("Create informasi dengan data judul kosong", async () => {
    const response = await request(app)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .field("judul", "")
      .field("deskripsi", "ini deskripsi baru")
      .field("tanggal", "2024-12-01")
      .field("sekolahId", "1,2,3")
      .attach("files", path.resolve(__dirname, "./assets/black.png"));

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Judul informasi harus diisi"
    );
  });

  it("Create informasi dengan data deskripsi kosong", async () => {
    const response = await request(app)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .field("judul", "ini judul baru")
      .field("deskripsi", "")
      .field("tanggal", "2024-12-01")
      .field("sekolahId", "1,2,3")
      .attach("files", path.resolve(__dirname, "./assets/black.png"));

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Deskripsi informasi harus diisi"
    );
  });

  it("Create informasi dengan data tanggal kosong", async () => {
    const response = await request(app)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .field("judul", "ini judul baru")
      .field("deskripsi", "ini deskripsi baru")
      .field("tanggal", "")
      .field("sekolahId", "1,2,3")
      .attach("files", path.resolve(__dirname, "./assets/black.png"));

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Tanggal informasi harus diisi"
    );
  });

  it("Create informasi dengan data pilihan sekolah kosong", async () => {
    const response = await request(app)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .field("judul", "ini judul baru")
      .field("deskripsi", "ini deskripsi baru")
      .field("tanggal", "2024-12-01")
      .field("sekolahId", "")
      .attach("files", path.resolve(__dirname, "./assets/black.png"));

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Harus memilih minimal 1 sekolah"
    );
  });

  it("Create informasi dengan data gambar kosong", async () => {
    const response = await request(app)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .field("judul", "ini judul baru")
      .field("deskripsi", "ini deskripsi baru")
      .field("tanggal", "2024-12-01")
      .field("sekolahId", "1,2,3");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Minimal 1 gambar yang harus diupload"
    );
  });

  it("Create informasi dengan data yang valid", async () => {
    const response = await request(app)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .field("judul", "Judul Informasi")
      .field("deskripsi", "Ini deskripsi informasi")
      .field("tanggal", "2024-12-01")
      .field("sekolahId", "1,2,3")
      .attach("files", path.resolve(__dirname, "./assets/black.png"));

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Informasi berhasil dibuat",
    });
  });
});
