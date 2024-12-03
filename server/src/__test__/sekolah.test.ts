import request from "supertest";
import app from "./setupTest";
import { generateMockToken } from "./mockToken";

describe("Fitur Update Sekolah", () => {
  let token: string;
  const endpoint = "/api/sekolah/1";

  const validData = {
    namaSekolah: "TPA Cita Sakinah",
    noHandphone: "081234567",
    jumlahAnak: "10",
    jumlahPengajar: "10",
    jumlahRuangan: "10",
    jamPulang: "10:00",
  };

  beforeAll(() => {
    token = generateMockToken({
      id: 1,
      sekolahId: 1,
      role: "admin",
      namaSekolah: "TPA Cita Sakinah",
    });
  });

  const makeRequest = async (data: Partial<typeof validData>) => {
    return request(app)
      .patch(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .send(data);
  };

  const testCases = [
    {
      field: "namaSekolah",
      value: "",
      errorMessage: "Nama sekolah harus diisi",
    },
    {
      field: "noHandphone",
      value: "",
      errorMessage: "No handphone harus diisi",
    },
    {
      field: "jumlahAnak",
      value: "",
      errorMessage: "Jumlah anak harus diisi",
    },
    {
      field: "jumlahPengajar",
      value: "",
      errorMessage: "Jumlah pengajar harus diisi",
    },
    {
      field: "jumlahRuangan",
      value: "",
      errorMessage: "Jumlah ruangan harus diisi",
    },
    {
      field: "jamPulang",
      value: "",
      errorMessage: "Jam pulang harus diisi",
    },
  ];

  testCases.forEach(({ field, value, errorMessage }) => {
    it(`Update gagal ketika ${field} kosong`, async () => {
      const invalidData = { ...validData, [field]: value };
      const res = await makeRequest(invalidData);

      expect(res.status).toBe(400);
      expect(res.body.message).toEqual(errorMessage);
    });
  });

  it("Update gagal ketika semua data kosong", async () => {
    const res = await makeRequest({
      namaSekolah: "",
      noHandphone: "",
      jumlahAnak: "",
      jumlahPengajar: "",
      jumlahRuangan: "",
      jamPulang: "",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("Semua kolom harus diisi");
  });

  it("Update berhasil dengan data valid", async () => {
    const res = await makeRequest(validData);

    expect(res.status).toBe(200);
    expect(res.body.message).toEqual("Data sekolah berhasil diupdate");
  });
});