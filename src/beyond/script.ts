import { ThemeId } from './theme';

/* ───────────────────────── Data model ───────────────────────── */
export type Company = 'openai' | 'google' | 'anthropic';
export type ModelId =
  | 'astra' | 'sol' | 'terra' | 'luna'
  | 'hydrogen' | 'carbon' | 'neon' | 'argon'
  | 'haiku' | 'sonnet' | 'opus' | 'fable';

export type ModelInfo = {
  name: string;
  company: Company;
  full: string;       // nama produk resmi (generasi + keluarga)
  role: string;       // peran menurut dokumentasi resmi
  etymWord: string;   // asal kata
  etymLang: string;
  etymGloss: string;
  accent: string;
  tile?: { z: number; sym: string; mass: string };
};

/** Semua deskripsi peran dirangkum dari dokumentasi/pengumuman resmi. Etimologi ≠ alasan resmi perusahaan. */
export const MODELS: Record<ModelId, ModelInfo> = {
  astra:    { name: 'Astra',    company: 'openai', full: 'GPT-6 Astra',      role: 'Model paling mampu OpenAI untuk pekerjaan paling menuntut.', etymWord: 'astra', etymLang: 'Latin', etymGloss: 'bintang-bintang', accent: '#BBD0FF' },
  sol:      { name: 'Sol',      company: 'openai', full: 'GPT-6.1 Sol',      role: 'Coding kompleks, riset, dan penggunaan komputer dengan biaya lebih seimbang.', etymWord: 'sol', etymLang: 'Latin', etymGloss: 'matahari', accent: '#FFB454' },
  terra:    { name: 'Terra',    company: 'openai', full: 'GPT-6.1 Terra',    role: 'Nalar visual, penggunaan komputer yang presisi, dan tulisan yang jernih.', etymWord: 'terra', etymLang: 'Latin', etymGloss: 'bumi, daratan', accent: '#6FB3FF' },
  luna:     { name: 'Luna',     company: 'openai', full: 'GPT-6 Luna',       role: 'Tugas terfokus dalam volume besar: cepat dan hemat.', etymWord: 'luna', etymLang: 'Latin', etymGloss: 'bulan', accent: '#D8DCE6' },
  hydrogen: { name: 'Hydrogen', company: 'google', full: 'Gemini 4 Hydrogen', role: 'Jalur cepat untuk coding dan agen sehari-hari.', etymWord: 'hydro-genes', etymLang: 'Yunani', etymGloss: 'pembentuk air', accent: '#F58AC9', tile: { z: 1, sym: 'H', mass: '1.008' } },
  carbon:   { name: 'Carbon',   company: 'google', full: 'Gemini 4 Carbon',   role: 'Proyek paling berat dan pekerjaan agen jangka panjang.', etymWord: 'carbo', etymLang: 'Latin', etymGloss: 'arang', accent: '#CFE4F0', tile: { z: 6, sym: 'C', mass: '12.011' } },
  neon:     { name: 'Neon',     company: 'google', full: 'Gemini 4 Neon',     role: 'Di antara Carbon dan Hydrogen: kedalaman untuk tugas kompleks, tanpa pemborosan.', etymWord: 'neos', etymLang: 'Yunani', etymGloss: 'baru', accent: '#FF7A3D', tile: { z: 10, sym: 'Ne', mass: '20.180' } },
  argon:    { name: 'Argon',    company: 'google', full: 'Gemini 4 Argon',    role: 'Penalaran frontier yang efisien; yang pertama dirilis di keluarga Gemini 4.', etymWord: 'argos', etymLang: 'Yunani', etymGloss: 'malas, tak aktif', accent: '#A99BFF', tile: { z: 18, sym: 'Ar', mass: '39.948' } },
  haiku:    { name: 'Haiku',    company: 'anthropic', full: 'Claude Haiku 5.5',  role: 'Tercepat dan paling hemat, untuk tugas bervolume tinggi dan peka waktu.', etymWord: 'haiku', etymLang: 'Jepang', etymGloss: 'puisi tiga baris, pola 5-7-5', accent: '#2A3C9A' },
  sonnet:   { name: 'Sonnet',   company: 'anthropic', full: 'Claude Sonnet 5.5', role: 'Kombinasi terbaik antara kecepatan dan kecerdasan.', etymWord: 'sonetto', etymLang: 'Italia', etymGloss: 'lagu kecil; puisi empat belas baris', accent: '#2A3C9A' },
  opus:     { name: 'Opus',     company: 'anthropic', full: 'Claude Opus 5.5',   role: 'Coding agentik berjam-jam dan kerja pengetahuan.', etymWord: 'opus', etymLang: 'Latin', etymGloss: 'karya', accent: '#2A3C9A' },
  fable:    { name: 'Fable',    company: 'anthropic', full: 'Claude Fable 5.2',  role: 'Penalaran paling menuntut dan agen jangka panjang. Satu lantai di atas Opus.', etymWord: 'fabula', etymLang: 'Latin', etymGloss: 'cerita, kisah', accent: '#8A6A1E' },
};

export type Beat = {
  /** subtitle; [[kata]] = disorot */
  text: string;
  /** kunci visual untuk scene */
  v: string;
  m?: ModelId;
  min?: number;
};

export type Chapter = {
  id: string;
  theme: ThemeId;
  numeral: string;
  titleEn: string;
  concept: string;
  company?: Company;
  beats: Beat[];
};

export const CHAPTERS: Chapter[] = [
  {
    id: 'prologue', theme: 'studio', numeral: 'I', titleEn: 'The Strange Names', concept: '', beats: [
      { v: 'names', text: 'Pernah mendengar nama AI seperti [[Claude Opus]], [[Gemini Hydrogen]], atau [[GPT Astra]]?' },
      { v: 'why', text: 'Tapi pernahkah terpikir, mengapa model AI modern punya nama yang semakin tidak biasa?' },
      { v: 'old', text: 'Kenapa tidak lagi sekadar Pro, Flash, atau Mini?' },
      { v: 'title', text: 'Selamat datang di [[Beyond the Names]]: filosofi di balik penamaan Frontier AI.', min: 190 },
    ],
  },
  {
    id: 'evolution', theme: 'studio', numeral: 'II', titleEn: 'The Evolution of Naming',
    concept: 'Dari label teknis menuju identitas.', beats: [
      { v: 'axis', text: 'Dulu, nama sebuah model menjawab satu pertanyaan sederhana: seberapa cepat, dan seberapa mampu?' },
      { v: 'axis2', text: 'Nano, Mini, Flash, Pro, Ultra: label teknis yang menunjuk kelas kecepatan, ukuran, dan harga.' },
      { v: 'timeline', text: 'Dalam tiga tahun, dua dari tiga laboratorium meninggalkan pola itu. Yang ketiga memulainya lebih awal.' },
      { v: 'gen', text: 'OpenAI merumuskannya terang-terangan: angka menandai generasi, sedangkan [[Sol]], [[Terra]], dan [[Luna]] menandai tingkat kemampuan yang bertahan.' },
      { v: 'identity', text: 'Nama berhenti menjadi spesifikasi. Ia mulai menjadi identitas.' },
      { v: 'lens', text: 'Dari sisi branding dan positioning, nama yang bermakna lebih mudah diingat dan memberi produk sebuah karakter.' },
    ],
  },
  {
    id: 'openai', theme: 'cosmos', numeral: 'III', titleEn: 'OpenAI: The Cosmic Identity',
    concept: 'Keluarga GPT menatap langit.', company: 'openai', beats: [
      { v: 'cosmos', text: 'OpenAI memilih langit. Keluarga GPT kini terdiri dari [[Astra]], [[Sol]], [[Terra]], dan [[Luna]].' },
      { v: 'model', m: 'astra', text: '[[Astra]] adalah kata Latin untuk bintang-bintang. GPT-6 Astra: model paling mampu OpenAI untuk pekerjaan paling menuntut.' },
      { v: 'model', m: 'sol', text: '[[Sol]], matahari. GPT-6.1 Sol dipakai untuk coding kompleks, riset, dan penggunaan komputer, dengan biaya lebih seimbang.' },
      { v: 'model', m: 'terra', text: '[[Terra]], bumi. GPT-6.1 Terra: bernalar visual, mengoperasikan komputer dengan presisi, dan menulis dengan jernih.' },
      { v: 'model', m: 'luna', text: '[[Luna]], bulan. GPT-6 Luna: cepat dan hemat, untuk tugas terfokus yang berjalan dalam jumlah besar.' },
      { v: 'orrery', text: 'Tafsir kami: dari semua bintang, ke matahari kita, ke bumi, lalu bulan. Perjalanan dari yang terjauh menuju yang terdekat.' },
    ],
  },
  {
    id: 'google', theme: 'spectral', numeral: 'IV', titleEn: 'Google DeepMind: The Language of Elements',
    concept: 'Gemini 4 berbicara dalam tabel periodik.', company: 'google', beats: [
      { v: 'periodic', text: 'Google DeepMind memilih tabel periodik. Gemini 4 hadir sebagai [[Argon]], [[Carbon]], [[Hydrogen]], dan [[Neon]].' },
      { v: 'model', m: 'hydrogen', text: '[[Hydrogen]], nomor atom 1: unsur teringan dan paling melimpah di alam semesta. Di Gemini 4, ia jalur cepat untuk coding dan agen.' },
      { v: 'model', m: 'carbon', text: '[[Carbon]], nomor 6: kerangka kimia kehidupan, bisa menjadi grafit atau berlian. Di Gemini 4, Carbon diarahkan ke proyek paling berat.' },
      { v: 'model', m: 'neon', text: '[[Neon]], nomor 10: gas mulia yang berpendar jingga-merah di dalam tabung. Gemini 4 Neon berada di antara Carbon dan Hydrogen.' },
      { v: 'model', m: 'argon', text: '[[Argon]], nomor 18: gas mulia yang nyaris tak bereaksi, dari kata Yunani untuk "malas". Gemini 4 Argon adalah yang pertama dirilis.' },
      { v: 'atomic', text: 'Tafsir kami: nama-nama ini adalah bahan dasar materi. Tetapi urutan nomor atom bukanlah peringkat kemampuan.' },
    ],
  },
  {
    id: 'anthropic', theme: 'washi', numeral: 'V', titleEn: 'Anthropic: The Language of Art',
    concept: 'Claude dinamai dari puisi, musik, dan cerita.', company: 'anthropic', beats: [
      { v: 'forms', text: 'Anthropic memilih seni. Sejak Claude 3 pada 2024, tiga nama: [[Haiku]], [[Sonnet]], dan [[Opus]].' },
      { v: 'model', m: 'haiku', text: '[[Haiku]]: puisi Jepang tiga baris berpola 5-7-5. Haiku 5.5 adalah yang tercepat, untuk tugas bervolume tinggi.' },
      { v: 'model', m: 'sonnet', text: '[[Sonnet]]: puisi empat belas baris, dari kata Italia sonetto, "lagu kecil". Sonnet 5.5: kecepatan dan kecerdasan dalam satu keseimbangan.' },
      { v: 'model', m: 'opus', text: '[[Opus]]: kata Latin untuk "karya", dipakai musisi untuk menomori komposisi. Opus 5.5 dibuat untuk coding agentik berjam-jam.' },
      { v: 'model', m: 'fable', text: 'Lalu hadir [[Fable]] dan [[Mythos]]: dongeng dan mitos. Fable 5.2, satu lantai di atas Opus, untuk penalaran paling menuntut.' },
      { v: 'scale', text: 'Tafsir kami: tiga baris, empat belas baris, lalu satu karya utuh. Nama-nama ini terbaca seperti skala sebuah karya.' },
    ],
  },
  {
    id: 'compare', theme: 'studio', numeral: 'VI', titleEn: 'Comparative Analysis',
    concept: 'Tiga laboratorium, tiga bahasa.', beats: [
      { v: 'trio', text: 'Tiga laboratorium, tiga cara memberi identitas: kosmik, ilmiah, dan artistik.' },
      { v: 'row0', text: 'Strategi penamaan. OpenAI: tingkat yang bertahan. Google: varian dalam satu generasi. Anthropic: skala sebuah karya.' },
      { v: 'row1', text: 'Hierarki. OpenAI: empat tingkat, Astra ke Luna. Google: peran, bukan peringkat. Anthropic: tangga Haiku sampai Fable.' },
      { v: 'row2', text: 'Identitas produk. Bintang untuk skala ambisi, unsur untuk bahan dasar teknik, karya sastra untuk karakter dan gaya.' },
      { v: 'row3', text: 'Ekosistem. OpenAI: ChatGPT, Codex, API. Google: aplikasi Gemini, AI Studio, Antigravity. Anthropic: Claude, API, Claude Code.' },
      { v: 'verdict', text: 'Satu pola yang sama: nama kini bekerja seperti bahasa, bukan lagi label.' },
    ],
  },
  {
    id: 'closing', theme: 'studio', numeral: 'VII', titleEn: 'Philosophical Closing',
    concept: 'Nama sebagai cermin.', beats: [
      { v: 'z1', text: 'Dulu, kita mengenal teknologi melalui nomor versi dan spesifikasi.' },
      { v: 'z2', text: 'Sekarang, kita mulai mengenalnya melalui bintang, unsur kimia, hingga karya sastra.' },
      { v: 'z3', text: 'Mungkin ini bukan sekadar perubahan nama.' },
      { v: 'z4', text: 'Ini adalah cara manusia memberikan identitas kepada sesuatu yang mereka ciptakan sendiri.' },
      { v: 'z5', text: 'Karena pada akhirnya, Frontier AI bukan hanya tentang seberapa jauh kecerdasan buatan berkembang,' },
      { v: 'z6', text: 'tetapi juga tentang seberapa jauh manusia mampu mendorong batas imajinasinya.' },
      { v: 'end', text: '', min: 300 },
    ],
  },
];
