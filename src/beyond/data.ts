import {Theme} from './util';
export const FPS = 30;
export const T = 18; // overlap transisi antar-bab (frame)
export const SCENES: {id: Theme; sec: number; tag: string; lines: string[]}[] = [
  {id: 'intro', sec: 18, tag: 'THE STRANGE|NAMES', lines: [
    'Pernah dengar Claude Opus, Gemini Hydrogen, atau GPT Astra?',
    'Mengapa nama model AI modern semakin tidak biasa?',
    'Kenapa tidak lagi sekadar Pro, Flash, atau Mini?']},
  {id: 'evo', sec: 21, tag: 'EVOLUTION|of Naming', lines: [
    'Dulu, nama model adalah label teknis: cepat, kuat, atau ringkas.',
    'Kini, nama menjadi identitas: posisi, karakter, dan cerita.',
    'Angka menandai generasi. Nama menandai kelas yang bertahan.']},
  {id: 'openai', sec: 32, tag: 'OPENAI|The Cosmic Identity', lines: [
    'OpenAI memakai tema langit. Angka menandai generasi, nama menandai tingkatan.',
    'Astra, Latin untuk “bintang”, adalah kelas teratas untuk pekerjaan tersulit.',
    'Sol, matahari, menyeimbangkan biaya dan kecerdasan. Terra, bumi, untuk kerja harian.',
    'Luna, bulan: cepat, hemat, untuk volume besar.',
    'Makna kosmik ini tafsir kami, bukan klaim resmi OpenAI.']},
  {id: 'deepmind', sec: 34, tag: 'DEEPMIND|Language of Elements', lines: [
    'Gemini 4 memakai unsur kimia. Hydrogen, unsur teringan, untuk kerja cepat dan berulang.',
    'Neon, gas mulia yang berpendar, di tengah: kedalaman dengan efisiensi.',
    'Argon, gas inert, adalah model frontier yang efisien.',
    'Carbon, fondasi kehidupan, untuk masalah paling berat.',
    'Kaitan unsur dan karakter adalah interpretasi, bukan alasan resmi Google.']},
  {id: 'anthropic', sec: 33, tag: 'ANTHROPIC|Language of Art', lines: [
    'Anthropic memilih seni. Haiku: puisi Jepang tiga baris, 5-7-5. Ringkas dan cepat.',
    'Sonnet: puisi empat belas baris, seimbang antara bentuk dan kedalaman.',
    'Opus: Latin untuk “karya”, istilah musik untuk komposisi agung.',
    'Di atasnya kini ada Fable dan Mythos: kisah dan mitos.',
    'Haiku, Sonnet, Opus tersusun naik menurut kemampuan.']},
  {id: 'compare', sec: 30, tag: 'COMPARISON|Three Strategies', lines: [
    'OpenAI: kosmos. Satu keluarga GPT, tingkatan eksplisit dari Astra hingga Luna.',
    'DeepMind: unsur. Empat nama yang berdiri sendiri, seperti katalog.',
    'Anthropic: sastra. Tangga jelas dari Haiku ke Opus, lalu Fable.',
    'Tiga strategi: hierarki, katalog, dan puisi yang bertahan lintas generasi.']},
  {id: 'close', sec: 22, tag: 'CLOSING|A Reflection', lines: [
    'Dulu, kita mengenal teknologi lewat nomor versi dan spesifikasi.',
    'Sekarang, lewat bintang, unsur kimia, hingga karya sastra.',
    'Ini cara manusia memberi identitas pada ciptaannya sendiri.',
    'Frontier AI juga tentang seberapa jauh manusia mendorong batas imajinasinya.']},
];
export const frames = (s: number) => Math.round(s * FPS);
export const TOTAL = SCENES.reduce((a, s) => a + frames(s.sec), 0) - (SCENES.length - 1) * T;
