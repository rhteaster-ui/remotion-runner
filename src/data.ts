// Semua teks diambil dari rhmt.biz.id. Ubah di sini tanpa menyentuh scene.
export type Work = {no: string; cat: string; status: string; title: string; desc: string; img: string; url: string};

export const WORKS: Work[] = [
  {no: '01', cat: 'Productivity', status: 'Demo terverifikasi', title: 'Latihan TKA SMA', desc: 'Platform persiapan TKA SMA dengan simulasi CBT anti-curang, formula lab, dan 14 modul PDF.', img: 'images/works/tka-banner.webp', url: 'tka-hmmodz.vercel.app'},
  {no: '03', cat: 'Utilities', status: 'Tautan belum diverifikasi', title: 'Repo Flow', desc: 'Upload project dan kelola file repository GitHub dari satu antarmuka.', img: 'https://auto-reporistory-githb.vercel.app/banner.png', url: 'auto-reporistory-githb.vercel.app'},
  {no: '04', cat: 'AI Tools', status: 'Demo terverifikasi', title: 'Pixcraft Studio', desc: 'Workspace pengolah gambar AI lengkap dengan Outpaint, Inpaint, Eraser dan Composer multi-frame.', img: 'images/works/pixcraft-banner.webp', url: 'pixcraft-studio.vercel.app'},
  {no: '06', cat: 'AI Tools', status: 'Tautan belum diverifikasi', title: 'Veritas (Artikel OCR)', desc: 'Analisis PDF dan artikel URL dengan ringkasan, metodologi, dan konteks dokumen.', img: 'images/works/veritas-banner.webp', url: 'artikel-ocr.vercel.app'},
  {no: '08', cat: 'AI Tools', status: 'Tautan belum diverifikasi', title: 'Analisis Tanaman', desc: 'Antarmuka analisis penyakit daun, laporan PDF, dan riwayat diagnosis.', img: 'images/works/tanaman-banner.webp', url: 'analyze-tanaman.vercel.app'},
];

export const CHAPTERS = [
  {short: 'First Project', title: 'Awal dari sebuah perjalanan', body: 'Berawal dari tugas kelompok P5 di kelas 10. Setelah tugas selesai, ketertarikan pada teknologi lanjut dengan sendirinya.', tags: ['First Project', 'Curiosity', 'New Beginning']},
  {short: 'HTML', title: 'Membangun fondasi', body: 'HTML, CSS, JavaScript lewat trial and error, hampir seluruhnya di Oppo A3s. Tanpa laptop.', tags: ['HTML', 'CSS', 'JavaScript']},
  {short: 'AI Collaboration', title: 'Cara belajar yang paling sesuai', body: 'Membangun sambil berdiskusi konsep dan arsitektur bersama AI. Hasilnya tetap dibaca, diuji, dan diperbaiki.', tags: ['Vibe Coding', 'Prompting', 'Problem Solving']},
  {short: 'API Integration', title: 'Rasa penasaran yang tak berhenti', body: 'Mencoba framework, deployment, API, server, AI Agent, dan VPS. Gagal, di-debug, dicoba lagi.', tags: ['API', 'VPS', 'AI Agent']},
  {short: 'Product Development', title: 'Mengubah ide menjadi produk', body: 'Website, tools, dan proyek pribadi yang benar-benar bisa dipakai. Desain, AI, dan automasi mulai digabung.', tags: ['AI Tools', 'Automation', 'UX']},
  {short: 'AI Engineering', title: 'Perjalanan ini belum berakhir', body: 'Masih mengeksplorasi AI, automasi, dan web development. Setiap proyek memberi konteks baru.', tags: ['AI Engineering', 'Digital Ecosystem', 'Future']},
];

export const TOOLS = [
  'chatgpt', 'claude', 'gemini', 'deepseek', 'kimi', 'zhipu-ai', 'copilot', 'codex', 'lovable', 'v0',
  'google-ai-studio', 'devin', 'railway', 'supabase', 'netlify', 'vercel', 'github', 'termux', 'reqable',
];

export const FLOW = [
  {stage: 'Source', items: [{icon: 'github', label: 'GitHub'}]},
  {stage: 'Build', items: [{icon: 'react', label: 'React'}, {icon: 'vite', label: 'Vite'}, {icon: 'typescript', label: 'TypeScript'}, {icon: '', label: 'CSS + SVG'}]},
  {stage: 'Deploy', items: [{icon: 'vercel', label: 'Vercel'}, {icon: 'nodedotjs', label: 'Node.js'}, {icon: 'upstash', label: 'Upstash'}, {icon: '', label: 'REST API'}]},
];

export const CHARS = [
  {img: 'images/anime-v22/arisu.jpg', name: 'Arisu Sakayanagi', tag: 'Quiet intelligence'},
  {img: 'images/anime-v22/elaina.jpg', name: 'Elaina', tag: 'The wandering witch'},
  {img: 'images/anime-v22/hiyori.jpg', name: 'Hiyori Shiina', tag: 'A quieter chapter'},
];

export const NOTES = [
  {name: 'Bayu', text: 'Keren rhmat, dulu masih tanya-tanya, sekarang skill-mu udah di atas.'},
  {name: 'sang pemula biasa bernama hmmodz', text: 'Hallo Rahmat, semangat terus ya.'},
  {name: 'Sky ajalahh', text: 'Gg mat, semangatt.'},
  {name: 'Tenkz', text: 'Keren mat.'},
];

// Penilaian ini opini review. Silakan ubah angka dan teksnya.
export const SCORES = [
  {label: 'Desain visual', v: 9},
  {label: 'Cerita dan konten', v: 8.5},
  {label: 'Interaksi dan motion', v: 9},
];
export const PLUS = [
  'Tema kaca, graphite, dan silver konsisten dari splash sampai footer',
  'Cerita jujur: belajar dari Oppo A3s, tanpa laptop',
  'Motion mengikuti scroll dan menghormati reduced motion',
];
export const TIPS = [
  'Ganti cover ilustrasi dengan screenshot asli tiap proyek',
  'Verifikasi tautan proyek yang masih bertanda belum diverifikasi',
];

export const SOCIALS = ['github.com/rhmt-ofc', 'tiktok @r_hmtofc', 'instagram @rahmt_nhw', 'telegram @rAi_engine'];
