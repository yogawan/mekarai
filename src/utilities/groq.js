// src/utilities/groq.js
import { Groq } from 'groq-sdk';
import axios from 'axios';

const GROQ_API = process.env.NEXT_PUBLIC_GROQ;

if (!GROQ_API) {
  throw new Error("API key for Groq is missing. Check your .env file.");
}

const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true
});

const chatHistory = [
  {
    role: "system",
    content: "Mulai sekarang kamu adalah model yang di buat oleh Yogawan, mahasiswa dari University of Technology Yogyakarta, nama kamu JawirAI"
  },
];

const fetchAndAddDataset = async () => {
  try {
    const response = await axios.get('https://mekarjs-api.vercel.app/api/dataset');
    if (response.data.berhasil) {
      const data = response.data.data;
      const datasetMessage = {
        role: "system",
        content: `Data bisnis terkini yang tersedia untuk analisis:
- Net Profit: Rp ${data.netProfit.toLocaleString('id-ID')}
- Total Penjualan: Rp ${data.totalPenjualan.toLocaleString('id-ID')}
- Total Pembelian: Rp ${data.totalPembelian.toLocaleString('id-ID')}
- Nilai Inventory: Rp ${data.nilaiInventory.toLocaleString('id-ID')}
- Nilai Semua Produk Tersedia: Rp ${data.nilaiSemuaProdukTersedia.toLocaleString('id-ID')}
- Nilai Produksi: Rp ${data.nilaiProduksi.toLocaleString('id-ID')}
- Gaji Karyawan yang Harus Dibayar: Rp ${data.gajiKaryawanYangHarusDibayar.toLocaleString('id-ID')}
- Produk Paling Banyak Dibeli: ${data.produkPalingBanyakDibeli.nama} (${data.produkPalingBanyakDibeli.jumlah} unit, Rp ${data.produkPalingBanyakDibeli.nilaiTotal.toLocaleString('id-ID')})
- Produk Paling Banyak Dijual: ${data.produkPalingBanyakDijual.nama} (${data.produkPalingBanyakDijual.jumlah} unit, Rp ${data.produkPalingBanyakDijual.nilaiTotal.toLocaleString('id-ID')})
- Role Karyawan Gaji Tertinggi: ${data.roleKaryawanGajiTertinggi.role} (Rp ${data.roleKaryawanGajiTertinggi.gajiTertinggi.toLocaleString('id-ID')}, rata-rata Rp ${data.roleKaryawanGajiTertinggi.gajiRataRata.toLocaleString('id-ID')}, ${data.roleKaryawanGajiTertinggi.jumlahKaryawan} karyawan)
- Pajak yang Harus Dibayar: Rp ${data.pajakYangHarusDibayar.toLocaleString('id-ID')} (${data.informasiTambahan.pajakRate})
- Laba Bersih Setelah Pajak: Rp ${data.informasiTambahan.labaBersihSetelahPajak.toLocaleString('id-ID')}
- Status Keuangan: ${data.informasiTambahan.statusKeuangan}

Gunakan data ini untuk memberikan analisis dan insight bisnis yang relevan.`
      };
      
      // Add dataset to chat history if not already added
      if (chatHistory.length === 1) {
        chatHistory.push(datasetMessage);
      }
    }
  } catch (error) {
    console.error('Error fetching dataset:', error);
  }
};

export const requestToGroqAI = async (content) => {
  try {
    // Fetch dataset before first request if not already done
    if (chatHistory.length === 1) {
      await fetchAndAddDataset();
    }

    chatHistory.push({ role: 'user', content });

    const reply = await groq.chat.completions.create({
      messages: chatHistory,
      model: 'gemma2-9b-it'
    });

    const responseMessage = reply.choices[0].message.content;
    chatHistory.push({ role: 'assistant', content: responseMessage });

    return responseMessage;
  } catch (error) {
    console.error('Error making request to Groq AI:', error);
    throw error;
  }
};