# xiiclass — Motion Graphics Review Video (Remotion)

Source code motion graphics review untuk aplikasi web **xiiclass** (MA NU Islamiyah Asembagus).
Dirancang dan dikodekan khusus dengan konsep arsitektur visual responsif, pergerakan spring presisi, dynamic lighting orbs, subtitle review bertahap, dan tampilan ganda:
- **Panggung Utama (Laptop Display):** Rekaman web versi desktop widescreen (`record_laptop.mp4`) di tengah-kiri.
- **Display Vertikal (Mobile Display):** Rekaman web versi HP (`record_mobile.mp4`) menempel rapi dan terpusat vertikal di tepi kanan laptop mockup.
- **Subtitle Review Interaktif:** Highlight teks review fitur di bagian bawah layar.

---

## 📁 Struktur Direktori
```
xiiclass-remotion-review/
├── .github/workflows/
│   └── render.yml           # GitHub Actions Cloud Render Engine
├── public/
│   ├── record_laptop.mp4    # Rekaman asli interaksi web desktop
│   └── record_mobile.mp4    # Rekaman asli interaksi web mobile
├── src/
│   ├── DeviceMockups.tsx    # Vektor presisi Laptop & Phone mockup dengan layar video
│   ├── Subtitles.tsx        # Cues teks review interaktif & visual dynamic tag
│   ├── XiiclassReview.tsx   # Komposisi utama: mesh background, spring layout, parallax
│   ├── Root.tsx             # Registrasi Composition 'XiiclassReview' (1920x1080 @ 30fps, 1140 frames)
│   └── index.ts             # Entry point Remotion
├── package.json
├── remotion.config.ts
└── tsconfig.json
```

---

## 🚀 Cara Menjalankan

### 1. Menjalankan Preview (Remotion Studio)
```bash
npm install
npm run dev
```

### 2. Render Cloud via GitHub Actions (Rekomendasi)
1. Push project ini ke repositori GitHub.
2. Buka tab **Actions** di repo GitHub.
3. Pilih workflow **Remotion Cloud Render Engine**.
4. Klik **Run workflow**. (Composition otomatis mendeteksi `XiiclassReview`).
5. Unduh hasil video `.mp4` dari tab **Artifacts** setelah selesai render.

### 3. Render Lokal (Opsional)
```bash
# Render video penuh 1080p
npm run render

# Render cepat resolusi 540p
npm run render:preview

# Cek 1 frame thumbnail
npm run still
```
