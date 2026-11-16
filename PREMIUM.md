# E-Rekap Premium (composition `ERekapPremium`)

    npm install
    npm run dev            # Remotion Studio -> pilih "ERekapPremium"
    npm run render:erekap  # -> out/erekap-premium.mp4
    npm run sfx            # (opsional) bangun ulang SFX sintetis

Tidak mengubah VO, timeline, subtitle, maupun music-bed asli: semua cue SFX dan animasi
membaca `src/data/erekap-timeline.json`, jadi tetap sinkron kalau VO diganti.

- `src/premium/fx.tsx`      efek bersama (Reveal, WordReveal, Tap/kursor, Sparks, Shine, Ambient, TransitionSweep, PremiumShell)
- `src/premium/scenes1.tsx` scene 1 (hook) & 2 (dashboard)
- `src/premium/scenes2.tsx` scene 3 (rekap+admin), 4 (ekspor+cetak), 5 (outro)
- `src/premium/cues.ts`     daftar SFX per detik (relatif ke scene)
- `pipeline/build_sfx_erekap.py` sintesis 16 SFX ke `public/audio/sfx-erekap/`
