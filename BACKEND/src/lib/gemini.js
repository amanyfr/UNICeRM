const RESPONSES = [
  {
    keywords:    ['halo', 'hi', 'hai', 'selamat', 'pagi', 'siang', 'malam'],
    answer:      'Halo! Selamat datang di UNICeRM. Saya Uni Guide, asisten virtual Uni Inside Media. Ada yang bisa saya bantu?',
    needsTicket: false,
  },
  {
    keywords:    ['layanan', 'produk', 'apa saja', 'fitur'],
    answer:      'Uni Inside Media menyediakan berbagai layanan kreatif digital, termasuk Uni Gift Studio (merchandise custom), UniSmiles (kiosk selfie), dan platform konten digital. Ada yang ingin Anda ketahui lebih lanjut?',
    needsTicket: false,
  },
  {
    keywords:    ['harga', 'biaya', 'tarif', 'cost', 'berapa'],
    answer:      'Untuk informasi harga layanan kami, silakan hubungi tim sales di sales@uniinside.id. Kami siap membantu!',
    needsTicket: false,
  },
  {
    keywords:    ['voucher', 'promo', 'diskon', 'kode'],
    answer:      'Cek voucher dan promo aktif di menu Voucher & Promo di portal Anda. Klik "Klaim" untuk mendapatkan voucher yang tersedia!',
    needsTicket: false,
  },
  {
    keywords:    ['tiket', 'komplain', 'masalah', 'kendala', 'error', 'tidak bisa', 'gabisa', 'trouble', 'bug'],
    answer:      'Saya akan membuatkan tiket support untuk Anda. Tim CS kami akan segera menangani masalah ini. Mohon tunggu sebentar ya!',
    needsTicket: true,
  },
  {
    keywords:    ['cs', 'customer service', 'agent', 'manusia', 'hubungi', 'bicara'],
    answer:      'Tim Customer Service kami siap membantu! Saya akan buatkan tiket agar CS kami bisa langsung menghubungi Anda.',
    needsTicket: true,
  },
  {
    keywords:    ['gift', 'souvenir', '3d', 'cetak', 'merchandise'],
    answer:      'Uni Gift Studio menyediakan souvenir custom dan cetak 3D berbasis AI. Cocok untuk kebutuhan personal maupun korporat. Hubungi kami untuk info lebih lanjut!',
    needsTicket: false,
  },
  {
    keywords:    ['jam', 'operasional', 'buka', 'tutup'],
    answer:      'Uni Inside Media beroperasi Senin-Jumat pukul 09.00-17.00 WIB. Di luar jam operasional, Anda tetap bisa membuat tiket dan kami akan merespons pada hari kerja berikutnya.',
    needsTicket: false,
  },
  {
    keywords:    ['instagram', 'ig', 'sosmed', 'social media', 'media sosial', 'follow'],
    answer:      'Ikuti kami di Instagram @uniinside.studio untuk update terbaru, portofolio, dan promo menarik dari Uni Inside Media! 📸',
    needsTicket: false,
  },
  {
    keywords:    ['terima kasih', 'makasih', 'thanks', 'thank you'],
    answer:      'Sama-sama! Senang bisa membantu Anda. Jika ada pertanyaan lain, jangan ragu untuk menghubungi kami kembali. 😊',
    needsTicket: false,
  },
];

const DEFAULT_RESPONSE = {
  answer:      'Maaf, saya belum bisa menjawab pertanyaan tersebut. Silakan buat tiket support agar tim CS kami bisa membantu Anda lebih lanjut.',
  needsTicket: true,
};

/**
 * Rule-based keyword chatbot — tidak butuh API key apapun.
 * @param {string} userMessage
 * @param {Array}  chatHistory - tidak dipakai, diterima untuk kompatibilitas
 * @returns {Promise<{ response: string, needsTicket: boolean }>}
 */
async function generateResponse(userMessage, chatHistory = []) {
  const msg = userMessage.toLowerCase();

  for (const item of RESPONSES) {
    if (item.keywords.some((kw) => msg.includes(kw))) {
      return { response: item.answer, needsTicket: item.needsTicket };
    }
  }

  return { response: DEFAULT_RESPONSE.answer, needsTicket: DEFAULT_RESPONSE.needsTicket };
}

module.exports = { generateResponse };
