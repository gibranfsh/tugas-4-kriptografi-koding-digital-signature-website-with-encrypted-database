import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

async function generateTranscript(mahasiswaDecrypted: any, kaprodi: string) {
  try {
    console.log("AAA", mahasiswaDecrypted);
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const fontSize = 7;
    const margin = 50;

    const drawText = (
      text: string,
      x: number,
      y: number,
      size: number = fontSize
    ) => {
      page.drawText(text, {
        x,
        y,
        size,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
    };

    drawText(
      "Program Studi Sistem dan Teknologi Informasi",
      margin,
      height - margin
    );
    drawText(
      "Sekolah Teknik Elektro dan Informatika",
      margin,
      height - margin - 15
    );
    drawText("Institut Teknologi Bandung", margin, height - margin - 30);
    drawText(
      "------------------------------------------",
      margin,
      height - margin - 45
    );

    drawText("Transkip Akademik", margin, height - margin - 75);

    drawText(`Nama: ${mahasiswaDecrypted.nama}`, margin, height - margin - 100);
    drawText(`NIM: ${mahasiswaDecrypted.nim}`, margin, height - margin - 115);

    drawText("No", margin, height - margin - 150);
    drawText("Kode mata kuliah", margin + 50, height - margin - 150);
    drawText("Nama mata kuliah", margin + 150, height - margin - 150);
    drawText("SKS", width - 90, height - margin - 150);
    drawText("Nilai", width - 50, height - margin - 150);

    let y = height - margin - 175;
    for (let i = 0; i < mahasiswaDecrypted.Nilai.length; i++) {
      const mataKuliah = mahasiswaDecrypted.Nilai[i].MataKuliah;
      const nilai = mahasiswaDecrypted.Nilai[i].nilai;

      if (mataKuliah && nilai) {
        const kode = mataKuliah.kode_mata_kuliah;
        const nama = mataKuliah.nama_mata_kuliah;
        const sks = mataKuliah.sks;

        drawText(String(i + 1), margin, y);
        drawText(String(kode), margin + 50, y);
        drawText(String(nama), margin + 150, y);
        drawText(String(sks), width - 90, y);
        drawText(String(nilai), width - 50, y);
        y -= 20;
      }
    }

    drawText(`Total Jumlah SKS = 36`, margin, y - 20);
    drawText(`IPK = ${mahasiswaDecrypted.ipk}`, margin, y - 35);

    drawText("Ketua Program Studi", margin, y - 70);

    // Handle base64-encoded signature
    const signature = mahasiswaDecrypted.tanda_tangan;
    const signatureLines = splitBase64IntoLines(signature, 100);

    let signatureY = y - 90;
    drawText("--Begin signature--", margin, signatureY);
    signatureY -= 20;
    
    for (const line of signatureLines) {
      drawText(line, margin, signatureY);
      signatureY -= 20;
    }

    drawText("--End signature--", margin, signatureY - 20);
    drawText(`(${kaprodi})`, margin, signatureY - 40);

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error("Error generating transcript:", error);
  }
}

function splitBase64IntoLines(base64String: string, maxLineLength: number): string[] {
  const lines = [];
  for (let i = 0; i < base64String.length; i += maxLineLength) {
    lines.push(base64String.substring(i, i + maxLineLength));
  }
  return lines;
}

export { generateTranscript };
