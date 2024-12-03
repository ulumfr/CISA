import request from "supertest";
import app from "../server"; 

describe("GET /informasi", () => {
  it("Menampilkan list data informasi", async () => {
    const response = await request(app).get("/api/informasi");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      const data = response.body[0];

      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("judul");
      expect(data).toHaveProperty("tanggal");
      expect(data).toHaveProperty("deskripsi");
      expect(data).toHaveProperty("image");
      expect(data.image).toBeInstanceOf(Array);
      expect(data).toHaveProperty("sekolah");
      expect(data.sekolah).toBeInstanceOf(Array);

      if (data.image.length > 0) {
        const image = data.image[0];
        expect(image).toHaveProperty("idImage");
        expect(image).toHaveProperty("fileName");
      }

      if (data.sekolah.length > 0) {
        const sekolah = data.sekolah[0];
        expect(sekolah).toHaveProperty("sekolahId");
        expect(sekolah).toHaveProperty("namaSekolah");
      }
    }
  });
});
