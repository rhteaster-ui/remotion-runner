export const FPS = 30;
export const T = 18;
export type Scene = {id: string; sec: number; tag: string; lines: string[]; glow: [string, string]; name?: string; role?: string};
const N: [string, string] = ['#2a3350', '#1b2a4a'];
export const SCENES: Scene[] = [
  {id: 'intro', sec: 16, tag: 'THE STRANGE|NAMES', glow: N, lines: ['Pernah dengar Claude Opus, Gemini Hydrogen, atau GPT Astra?', 'Mengapa nama model AI kini semakin tidak biasa, bukan lagi Pro, Flash, atau Mini?']},
  {id: 'evo', sec: 16, tag: 'EVOLUTION|of Naming', glow: N, lines: ['Dulu, nama adalah label teknis: cepat, kuat, ringkas.', 'Kini, nama adalah identitas. Angka menandai generasi, nama menandai kelas.']},
  {id: 'astra', sec: 10, tag: 'OPENAI|The Cosmic Identity', glow: ['#5b3df0', '#d9a441'], name: 'ASTRA', role: 'Alam semesta · kelas teratas', lines: ['OpenAI memakai tema kosmos. Astra, Latin untuk “bintang”, adalah kelas teratas untuk pekerjaan tersulit.']},
  {id: 'sol', sec: 9, tag: 'OPENAI|The Cosmic Identity', glow: ['#ff8a00', '#ffcc33'], name: 'SOL', role: 'Matahari · seimbang', lines: ['Sol, matahari: menyeimbangkan biaya dan kecerdasan untuk coding dan agen.']},
  {id: 'terra', sec: 9, tag: 'OPENAI|The Cosmic Identity', glow: ['#0a7bd8', '#2f9e5b'], name: 'TERRA', role: 'Bumi · kerja harian', lines: ['Terra, bumi: model seimbang yang membumi untuk kerja sehari-hari.']},
  {id: 'luna', sec: 11, tag: 'OPENAI|The Cosmic Identity', glow: ['#7fa3c7', '#3a4658'], name: 'LUNA', role: 'Bulan · cepat & hemat', lines: ['Luna, bulan: cepat dan hemat untuk volume besar.', 'Makna kosmik ini tafsir kami, bukan klaim resmi OpenAI.']},
  {id: 'hydrogen', sec: 10, tag: 'DEEPMIND|Language of Elements', glow: ['#37d6ff', '#9ee7ff'], name: 'HYDROGEN', role: 'Unsur teringan · cepat', lines: ['Gemini 4 memakai unsur kimia. Hydrogen, unsur teringan, untuk kerja cepat dan berulang.']},
  {id: 'neon', sec: 9, tag: 'DEEPMIND|Language of Elements', glow: ['#ff3d2e', '#d11bff'], name: 'NEON', role: 'Gas berpendar · seimbang', lines: ['Neon, gas mulia yang berpendar, menyeimbangkan kedalaman dan efisiensi.']},
  {id: 'argon', sec: 9, tag: 'DEEPMIND|Language of Elements', glow: ['#3d6dff', '#9b5cff'], name: 'ARGON', role: 'Gas inert · frontier efisien', lines: ['Argon, gas inert, adalah model frontier yang efisien.']},
  {id: 'carbon', sec: 12, tag: 'DEEPMIND|Language of Elements', glow: ['#8a94a6', '#3b4252'], name: 'CARBON', role: 'Fondasi kehidupan · terberat', lines: ['Carbon, fondasi kehidupan, untuk masalah paling berat.', 'Kaitan unsur dan karakter adalah tafsir, bukan alasan resmi Google.']},
  {id: 'haiku', sec: 11, tag: 'ANTHROPIC|Language of Art', glow: ['#e8e1d2', '#cc5a1a'], name: 'HAIKU', role: 'Puisi tiga baris · cepat', lines: ['Anthropic memilih seni. Haiku: puisi Jepang tiga baris, 5-7-5. Ringkas dan cepat.']},
  {id: 'sonnet', sec: 9, tag: 'ANTHROPIC|Language of Art', glow: ['#d9822b', '#8a5a34'], name: 'SONNET', role: 'Empat belas baris · seimbang', lines: ['Sonnet: puisi empat belas baris, seimbang antara bentuk dan kedalaman.']},
  {id: 'opus', sec: 11, tag: 'ANTHROPIC|Language of Art', glow: ['#cc5a1a', '#f3e6cf'], name: 'OPUS', role: 'Karya agung · terkuat', lines: ['Opus: Latin untuk “karya”, istilah musik untuk komposisi agung.', 'Di atasnya kini ada Fable dan Mythos.']},
  {id: 'compare', sec: 17, tag: 'COMPARISON|Three Strategies', glow: N, lines: ['OpenAI: kosmos dengan tingkatan eksplisit. DeepMind: unsur seperti katalog.', 'Anthropic: sastra dengan tangga jelas dari Haiku ke Opus, lalu Fable.']},
  {id: 'close', sec: 20, tag: 'CLOSING|A Reflection', glow: N, lines: ['Dulu, kita mengenal teknologi lewat nomor versi dan spesifikasi. Kini lewat bintang, unsur, dan sastra.', 'Ini cara manusia memberi identitas pada ciptaannya.', 'Frontier AI juga tentang seberapa jauh kita mendorong batas imajinasi.']},
];
export const frames = (s: number) => Math.round(s * FPS);
export const TOTAL = SCENES.reduce((a, s) => a + frames(s.sec), 0) - (SCENES.length - 1) * T;
