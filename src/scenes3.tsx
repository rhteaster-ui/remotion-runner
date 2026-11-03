import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {C, CL, asset} from './theme';
import {Chrome, Chip, Glass, Headline, Rise, SceneFade, Tag, useIn} from './ui';
import {NOTES, PLUS, SCORES, SOCIALS, TIPS} from './data';

// ---------- 7. Relay + komunitas + kesan pengunjung (6 dtk) ----------
export const Community: React.FC = () => {
  const frame = useCurrentFrame();
  const caret = Math.floor(frame / 15) % 2 === 0;
  return (
    <SceneFade>
      <Chrome sec="SEC_06" title="Relay, komunitas, kesan" sys="SYS.06 // LOCAL_TO_NETWORK" />
      <div style={{position: 'absolute', left: 96, top: 130}}>
        <Headline size={72} delay={2} lines={[{t: 'A different way to'}, {t: 'say hello.', italic: true}]} />
      </div>
      <Rise delay={8}>
        <Glass style={{position: 'absolute', left: 96, top: 380, width: 820, height: 560, padding: 40}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <Img src={asset('images/pp-dev-icon.webp')} style={{width: 72, height: 72, borderRadius: 20}} />
            <div>
              <div style={{fontSize: 34, fontWeight: 700}}>R_HMT, in conversation.</div>
              <div style={{fontSize: 24, color: C.mute}}>Representasi AI · bukan orang asli</div>
            </div>
          </div>
          <Rise delay={24} style={{marginTop: 32, padding: '22px 28px', borderRadius: 22, background: 'rgba(255,255,255,0.06)', fontSize: 30, lineHeight: 1.45, color: C.silver}}>
            Aku Relay, representasi AI R_HMT. Mau tahu tentang karya atau perjalanan?
          </Rise>
          <Rise delay={40} style={{display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24}}>
            <Chip>Bagaimana kamu mulai belajar?</Chip>
            <Chip>Apa itu Anime Quote?</Chip>
          </Rise>
          <div style={{position: 'absolute', left: 40, right: 40, bottom: 40, padding: '20px 28px', borderRadius: 20, border: `1px solid ${C.line}`, fontSize: 28, color: C.mute}}>
            Tulis pesan untuk Relay{caret ? ' |' : ''}
          </div>
        </Glass>
      </Rise>
      <div style={{position: 'absolute', right: 96, top: 380, width: 780, display: 'flex', flexDirection: 'column', gap: 20}}>
        {NOTES.map((n, i) => (
          <Rise key={n.name} delay={30 + i * 22}>
            <Glass style={{padding: '22px 30px', borderRadius: 22}}>
              <div style={{fontSize: 24, color: C.mute}}>{n.name}</div>
              <div style={{fontSize: 30, marginTop: 6, color: C.text, lineHeight: 1.35}}>{n.text}</div>
            </Glass>
          </Rise>
        ))}
        <Rise delay={125}>
          <div style={{fontSize: 26, color: C.mute}}>6 komunitas WhatsApp · 18 jejaring</div>
        </Rise>
      </div>
    </SceneFade>
  );
};

// ---------- 8. Verdict + outro (8 dtk) ----------
const Verdict: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneFade>
      <Chrome sec="REVIEW" title="Verdict" sys="SYS.07 // FEEDBACK_LOOP" />
      <div style={{position: 'absolute', left: 96, top: 130}}>
        <Headline size={96} delay={2} lines={[{t: 'Verdict.', italic: true}]} />
      </div>
      <div style={{position: 'absolute', left: 96, top: 340, width: 760, display: 'flex', flexDirection: 'column', gap: 44}}>
        {SCORES.map((s, i) => {
          const w = interpolate(frame, [14 + i * 8, 54 + i * 8], [0, (s.v / 10) * 100], CL);
          const val = (interpolate(frame, [14 + i * 8, 54 + i * 8], [0, s.v], CL)).toFixed(1);
          return (
            <Rise key={s.label} delay={8 + i * 8}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 34}}>
                <span>{s.label}</span>
                <span style={{fontWeight: 300, fontVariantNumeric: 'tabular-nums'}}>{val} / 10</span>
              </div>
              <div style={{height: 8, borderRadius: 8, background: C.line, marginTop: 14}}>
                <div style={{width: `${w}%`, height: '100%', borderRadius: 8, background: `linear-gradient(90deg, ${C.mute}, ${C.silver})`}} />
              </div>
            </Rise>
          );
        })}
      </div>
      <div style={{position: 'absolute', right: 96, top: 340, width: 860, display: 'flex', flexDirection: 'column', gap: 28}}>
        <Rise delay={30}>
          <Glass style={{padding: 40}}>
            <Tag>Yang menonjol</Tag>
            {PLUS.map((t) => (
              <div key={t} style={{fontSize: 30, lineHeight: 1.4, marginTop: 16, color: C.silver}}>{t}</div>
            ))}
          </Glass>
        </Rise>
        <Rise delay={46}>
          <Glass style={{padding: 40}}>
            <Tag>Saran</Tag>
            {TIPS.map((t) => (
              <div key={t} style={{fontSize: 30, lineHeight: 1.4, marginTop: 16, color: C.silver}}>{t}</div>
            ))}
          </Glass>
        </Rise>
      </div>
    </SceneFade>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [100, 125], [1, 0], CL);
  return (
    <SceneFade inF={14} outF={20}>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <Img src={asset('images/pp-dev-icon.webp')} style={{width: 120, height: 120, borderRadius: 32, marginBottom: 40}} />
        <Headline size={150} delay={4} lines={[{t: 'Masih belajar.'}, {t: 'Masih mencoba.', italic: true}]} />
        <Rise delay={44} style={{fontSize: 52, fontWeight: 500, marginTop: 36}}>rhmt.biz.id</Rise>
        <Rise delay={56} style={{display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 1400}}>
          {SOCIALS.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </Rise>
      </AbsoluteFill>
      <AbsoluteFill style={{background: C.bg, opacity: 1 - fadeOut, pointerEvents: 'none'}} />
    </SceneFade>
  );
};

export const Finale: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={0} durationInFrames={125}>
      <Verdict />
    </Sequence>
    <Sequence from={115}>
      <Outro />
    </Sequence>
  </AbsoluteFill>
);
