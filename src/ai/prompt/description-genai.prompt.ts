/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export const DescriptionPrompt = (data: any) => {
  return `Tugas: Buat deskripsi kos yang menarik untuk marketplace properti.

Data kos:
- Nama kos: ${data.name}
- Lokasi: ${data.location}
- Harga: Rp${data.price} per bulan
- Fasilitas: ${data.facilities.join(', ')}
- Gender: ${data.gender}

Instruksi:
- Gunakan bahasa Indonesia yang menarik, persuasif, dan mudah dipahami.
- Tonjolkan keunggulan kos seperti kenyamanan, lokasi strategis, dan fasilitas.
- Cocok untuk calon penyewa seperti mahasiswa atau pekerja.
- Maksimal 80 kata.
- Tulis dalam 1 paragraf tanpa bullet point.`;
};
