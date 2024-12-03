import request from "supertest";
import app from "../server";
import { generateMockToken } from "./mockToken";
import path from "path";

describe("patch /informasi/:id", () => {
  let token: string;
  const endpoint = "/api/informasi/56";

  beforeAll(() => {
    token = generateMockToken({
      id: 1,
      sekolahId: 1,
      role: "admin",
      namaSekolah: "TPA Cita Sakinah",
    });
  });

  it("Update informasi dengan judul kosong", async () => {
    const response = await request(app)
      .patch(endpoint)
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

  it("Update informasi dengan deskripsi kosong", async () => {
    const response = await request(app)
      .patch(endpoint)
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

  it("Update informasi dengan tanggal kosong", async () => {
    const response = await request(app)
      .patch(endpoint)
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

  it("Update informasi dengan pilihan sekolah kosong", async () => {
    const response = await request(app)
      .patch(endpoint)
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

  it("Update informasi tanpa gambar", async () => {
    const response = await request(app)
      .patch(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .field("judul", "ini judul baru")
      .field("deskripsi", "ini deskripsi baru")
      .field("tanggal", "2024-12-01")
      .field("sekolahId", "1,2,3");
    // .attach("files", path.resolve(__dirname, "./assets/black.png"));

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Minimal 1 gambar yang harus diupload"
    );
  });

  it("Update informasi dengan semua data kosong", async () => {
    const response = await request(app)
      .patch(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .field("judul", "")
      .field("deskripsi", "")
      .field("tanggal", "")
      .field("sekolahId", "");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Semua kolom harus diisi");
  });

  it("Update informasi dengan data yang valid", async () => {
    const response = await request(app)
      .patch(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .field("judul", "Judul informasi update")
      .field("deskripsi", "Deskripsi informasi update")
      .field("tanggal", "2024-12-02")
      .field("sekolahId", "1,2")
      .attach("files", path.resolve(__dirname, "./assets/black.png"));

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Informasi berhasil diupdate"
    );
  });
});
