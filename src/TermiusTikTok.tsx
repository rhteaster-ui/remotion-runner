import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

// ====== EDIT DI SINI ======
const HANDLE = '@rhmtofc';
const SHORTCUTS: {keys: string[]; desc: string}[] = [
  {keys: ['Ctrl', 'J'], desc: 'Quick connect / cari host'},
  {keys: ['Ctrl', 'T'], desc: 'Buka tab baru'},
  {keys: ['Ctrl', 'W'], desc: 'Tutup tab'},
  {keys: ['Ctrl', 'Tab'], desc: 'Pindah antar tab'},
  {keys: ['Ctrl', 'Shift', 'D'], desc: 'Split terminal'},
]; // cek tombol aslinya di Termius: Settings > Hotkeys
// ==========================

const C = {bg: '#0f1115', panel: '#171a21', side: '#12141a', line: '#262b36', text: '#e8ecf4', mute: '#8a93a6', acc: '#3d7cff', green: '#37d67a', amber: '#ffb84d'};
const FONT = 'Inter, "Segoe UI", system-ui, sans-serif';
const MONO = '"JetBrains Mono", "Fira Code", Menlo, monospace';

const S = {hook: 120, tour: 300, add: 300, term: 270, keys: 300, set: 270, cta: 150};
export const TOTAL = Object.values(S).reduce((a, b) => a + b, 0);

const fade = (f: number, s = 0, d = 12) => interpolate(f, [s, s + d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
const typed = (t: string, f: number, s: number, sp = 2) => t.slice(0, Math.max(0, Math.floor((f - s) / sp)));

const Pop: React.FC<{delay?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({delay = 0, children, style}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - delay, fps, config: {damping: 14}});
  return <div style={{transform: `scale(${0.7 + 0.3 * s})`, opacity: s, ...style}}>{children}</div>;
};

const Caption: React.FC<{text: string; sub?: string}> = ({text, sub}) => (
  <div style={{position: 'absolute', left: 60, right: 60, bottom: 330, textAlign: 'center', fontFamily: FONT}}>
    <div style={{display: 'inline-block', background: '#000c', padding: '18px 36px', borderRadius: 28, fontSize: 52, fontWeight: 800, color: '#fff', lineHeight: 1.25}}>{text}</div>
    {sub && <div style={{marginTop: 14, fontSize: 34, color: C.mute}}>{sub}</div>}
  </div>
);

const Badge: React.FC<{n: string; t: string}> = ({n, t}) => (
  <div style={{position: 'absolute', top: 150, left: 60, display: 'flex', alignItems: 'center', gap: 18, fontFamily: FONT}}>
    <div style={{background: C.acc, color: '#fff', fontWeight: 900, fontSize: 40, padding: '8px 22px', borderRadius: 16}}>{n}</div>
    <div style={{fontSize: 46, fontWeight: 800, color: C.text}}>{t}</div>
  </div>
);

const SIDE = ['Hosts', 'Keychain', 'Port Forwarding', 'Snippets', 'Known Hosts', 'Logs', 'Settings'];
const ICON = ['▦', '⚿', '⇄', '‹›', '✓', '≣', '⚙'];

const Win: React.FC<{active: number; tab?: string; children: React.ReactNode}> = ({active, tab, children}) => (
  <div style={{position: 'absolute', left: 60, top: 300, width: 960, height: 1000, borderRadius: 24, background: C.bg, border: `2px solid ${C.line}`, boxShadow: '0 40px 100px #000a', overflow: 'hidden', fontFamily: FONT, color: C.text, display: 'flex', flexDirection: 'column'}}>
    <div style={{height: 60, background: C.side, borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10}}>
      {['#ff5f57', '#febc2e', '#28c840'].map((c) => <div key={c} style={{width: 16, height: 16, borderRadius: 8, background: c}} />)}
      <div style={{marginLeft: 24, display: 'flex', gap: 8, fontSize: 24}}>
        <div style={{padding: '6px 18px', borderRadius: 10, background: tab ? 'transparent' : C.panel, color: tab ? C.mute : C.text}}>Vaults</div>
        {tab && <div style={{padding: '6px 18px', borderRadius: 10, background: C.panel, borderBottom: `3px solid ${C.green}`}}>● {tab}</div>}
      </div>
    </div>
    <div style={{flex: 1, display: 'flex'}}>
      <div style={{width: 270, background: C.side, borderRight: `1px solid ${C.line}`, padding: '20px 14px'}}>
        {SIDE.map((s, i) => (
          <div key={s} style={{display: 'flex', gap: 14, alignItems: 'center', padding: '16px 16px', borderRadius: 14, marginBottom: 6, fontSize: 28, fontWeight: 600, background: i === active ? C.acc : 'transparent', color: i === active ? '#fff' : C.mute}}>
            <span style={{width: 30, textAlign: 'center'}}>{ICON[i]}</span>{s}
          </div>
        ))}
      </div>
      <div style={{flex: 1, padding: 28, position: 'relative'}}>{children}</div>
    </div>
  </div>
);

const Row: React.FC<{t: string; s?: string; hl?: boolean}> = ({t, s, hl}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '20px 24px', background: hl ? '#1d2a47' : C.panel, border: `2px solid ${hl ? C.acc : C.line}`, borderRadius: 16, marginBottom: 14}}>
    <div style={{width: 44, height: 44, borderRadius: 12, background: C.acc + '33', color: C.acc, display: 'grid', placeItems: 'center', fontSize: 24}}>›</div>
    <div>
      <div style={{fontSize: 30, fontWeight: 700}}>{t}</div>
      {s && <div style={{fontSize: 23, color: C.mute, fontFamily: MONO}}>{s}</div>}
    </div>
  </div>
);

const HOSTS = [['VPS Produksi', 'root@103.xx.xx.1', C.green], ['Raspberry Pi', 'pi@192.168.1.8', C.amber], ['Staging', 'ubuntu@10.0.0.5', C.acc], ['Backup', 'admin@10.0.0.9', C.mute]] as const;
const HostGrid: React.FC<{hl?: number}> = ({hl = -1}) => (
  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
    {HOSTS.map(([n, a, c], i) => (
      <div key={n} style={{background: i === hl ? '#1d2a47' : C.panel, border: `2px solid ${i === hl ? C.acc : C.line}`, borderRadius: 18, padding: 22, display: 'flex', gap: 16, alignItems: 'center'}}>
        <div style={{width: 56, height: 56, borderRadius: 14, background: c, display: 'grid', placeItems: 'center', fontSize: 28, color: '#000'}}>{'>_'}</div>
        <div><div style={{fontSize: 28, fontWeight: 700}}>{n}</div><div style={{fontSize: 21, color: C.mute, fontFamily: MONO}}>{a}</div></div>
      </div>
    ))}
  </div>
);

const Head: React.FC<{t: string; btn?: string}> = ({t, btn}) => (
  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}}>
    <div style={{fontSize: 38, fontWeight: 800}}>{t}</div>
    {btn && <div style={{background: C.acc, padding: '12px 24px', borderRadius: 14, fontSize: 26, fontWeight: 700}}>{btn}</div>}
  </div>
);

// ---------- Scenes ----------
const Hook: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{fontFamily: FONT, alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 70}}>
      <Pop><div style={{width: 200, height: 200, borderRadius: 48, background: C.acc, display: 'grid', placeItems: 'center', fontSize: 110, fontWeight: 900, color: '#fff', boxShadow: `0 0 120px ${C.acc}88`}}>{'>_'}</div></Pop>
      <div style={{opacity: fade(f, 15), fontSize: 92, fontWeight: 900, color: C.text, marginTop: 60, lineHeight: 1.1}}>SSH ke server<br />tanpa ribet?</div>
      <div style={{opacity: fade(f, 40), fontSize: 50, color: C.acc, fontWeight: 800, marginTop: 36}}>Dasar Termius dalam 1 menit</div>
    </AbsoluteFill>
  );
};

const TOUR = [0, 1, 2, 3, 6];
const TOUR_TXT = ['Hosts: daftar server kamu', 'Keychain: simpan SSH key', 'Port Forwarding: akses port server', 'Snippets: command favorit sekali klik', 'Settings: atur semuanya di sini'];
const Tour: React.FC = () => {
  const f = useCurrentFrame();
  const k = Math.min(4, Math.floor(f / 60));
  const a = TOUR[k];
  const panes: Record<number, {t: string; s?: string}[]> = {
    1: [{t: 'id_ed25519', s: 'SSH key tersimpan aman'}, {t: 'deploy-key', s: 'dipakai banyak host'}],
    2: [{t: 'Local 3000', s: 'localhost:3000 ⇄ server:3000'}, {t: 'Database', s: 'localhost:5432 ⇄ db:5432'}],
    3: [{t: 'Restart app', s: 'pm2 restart all'}, {t: 'Cek log', s: 'tail -f app.log'}, {t: 'Update', s: 'sudo apt update && upgrade'}],
    6: [{t: 'Terminal', s: 'font, tema, cursor'}, {t: 'Hotkeys', s: 'atur shortcut'}, {t: 'Sync', s: 'host sama di semua device'}],
  };
  return (
    <AbsoluteFill>
      <Badge n="01" t="Kenali tampilannya" />
      <Win active={a}>
        <Head t={SIDE[a]} btn={a === 0 ? '+ New Host' : undefined} />
        {a === 0 ? <HostGrid /> : panes[a].map((r) => <Row key={r.t} {...r} />)}
      </Win>
      <Caption key={k} text={TOUR_TXT[k]} />
    </AbsoluteFill>
  );
};

const Field: React.FC<{n: number; label: string; val: string; start: number; secret?: boolean}> = ({n, label, val, start, secret}) => {
  const f = useCurrentFrame();
  const raw = typed(val, f, start, 3);
  const on = f >= start && f < start + val.length * 3 + 12;
  return (
    <div style={{marginBottom: 22, opacity: fade(f, start - 10)}}>
      <div style={{fontSize: 24, color: C.mute, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12}}>
        <span style={{background: C.acc, color: '#fff', borderRadius: 20, width: 36, height: 36, display: 'grid', placeItems: 'center', fontWeight: 800}}>{n}</span>{label}
      </div>
      <div style={{background: C.panel, border: `2px solid ${on ? C.acc : C.line}`, borderRadius: 14, padding: '16px 20px', fontSize: 32, fontFamily: MONO, minHeight: 36}}>
        {secret ? '•'.repeat(raw.length) : raw}{on && <span style={{color: C.acc}}>▌</span>}
      </div>
    </div>
  );
};

const AddHost: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = f > 235 ? 1 + 0.06 * Math.sin((f - 235) / 4) : 1;
  return (
    <AbsoluteFill>
      <Badge n="02" t="Tambah server" />
      <Win active={0}>
        <Head t="New Host" />
        <Field n={1} label="Label" val="VPS Produksi" start={20} />
        <Field n={2} label="Address (IP / domain)" val="103.xx.xx.1" start={70} />
        <Field n={3} label="Username" val="root" start={125} />
        <Field n={4} label="Password / Key" val="rahasia123" start={160} secret />
        <div style={{marginTop: 30, opacity: fade(f, 225), transform: `scale(${pulse})`, background: C.green, color: '#000', width: 220, textAlign: 'center', padding: '16px 0', borderRadius: 16, fontSize: 32, fontWeight: 800}}>✓ Save</div>
      </Win>
      <Caption text="Isi 4 kolom → Save. Selesai!" />
    </AbsoluteFill>
  );
};

const LINES = [
  {t: 'Connecting to 103.xx.xx.1…', s: 20, c: C.mute},
  {t: '✓ Connected via SSH', s: 60, c: C.green},
  {t: 'root@vps:~# pm2 status', s: 100, c: C.text, type: true},
  {t: '│ api │ online │ 0 restarts │', s: 160, c: C.green},
  {t: 'root@vps:~# ', s: 195, c: C.text},
];
const Terminal: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Badge n="03" t="Connect" />
      <Win active={0} tab="VPS Produksi">
        {f < 20 ? <HostGrid hl={0} /> : (
          <div style={{background: '#000', borderRadius: 16, padding: 28, height: 830, fontFamily: MONO, fontSize: 30, lineHeight: 1.7}}>
            {LINES.map((l, i) => f >= l.s && <div key={i} style={{color: l.c}}>{l.type ? typed(l.t, f, l.s, 2) : l.t}{i === LINES.length - 1 && Math.floor(f / 10) % 2 === 0 ? '▌' : ''}</div>)}
          </div>
        )}
      </Win>
      <Caption text="Klik 2x host → langsung masuk" sub="Nggak perlu ketik ssh manual" />
    </AbsoluteFill>
  );
};

const Key: React.FC<{k: string}> = ({k}) => (
  <span style={{background: '#232836', border: `2px solid ${C.line}`, borderBottom: `6px solid ${C.line}`, borderRadius: 12, padding: '8px 18px', fontSize: 28, fontWeight: 800, fontFamily: MONO}}>{k}</span>
);
const Keys: React.FC = () => (
  <AbsoluteFill>
    <Badge n="04" t="Shortcut wajib hafal" />
    <Win active={6}>
      <Head t="Hotkeys" />
      {SHORTCUTS.map((s, i) => (
        <Pop key={s.desc} delay={15 + i * 40}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.panel, border: `2px solid ${C.line}`, borderRadius: 16, padding: '22px 24px', marginBottom: 16}}>
            <div style={{fontSize: 28, fontWeight: 600}}>{s.desc}</div>
            <div style={{display: 'flex', gap: 8}}>{s.keys.map((k) => <Key key={k} k={k} />)}</div>
          </div>
        </Pop>
      ))}
    </Win>
    <Caption text="Kerja jadi 2x lebih cepat" sub="Mac: ganti Ctrl → Cmd" />
  </AbsoluteFill>
);

const Toggle: React.FC<{on: boolean}> = ({on}) => (
  <div style={{width: 86, height: 46, borderRadius: 23, background: on ? C.green : C.line, position: 'relative'}}>
    <div style={{position: 'absolute', top: 5, left: on ? 45 : 5, width: 36, height: 36, borderRadius: 18, background: '#fff'}} />
  </div>
);
const Settings: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [20, 90], [0.3, 0.7], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const card: React.CSSProperties = {background: C.panel, border: `2px solid ${C.line}`, borderRadius: 18, padding: 24, marginBottom: 18};
  return (
    <AbsoluteFill>
      <Badge n="05" t="Settingan penting" />
      <Win active={6}>
        <Head t="Terminal" />
        <div style={card}>
          <div style={{fontSize: 28, fontWeight: 700, marginBottom: 16}}>Font size: {Math.round(12 + p * 10)}</div>
          <div style={{height: 10, background: C.line, borderRadius: 5, position: 'relative'}}>
            <div style={{width: `${p * 100}%`, height: 10, background: C.acc, borderRadius: 5}} />
            <div style={{position: 'absolute', top: -10, left: `${p * 100}%`, width: 30, height: 30, borderRadius: 15, background: '#fff'}} />
          </div>
        </div>
        <div style={card}>
          <div style={{fontSize: 28, fontWeight: 700, marginBottom: 16}}>Theme</div>
          <div style={{display: 'flex', gap: 12}}>
            {['Termius Dark', 'Dracula', 'Solarized'].map((t, i) => (
              <div key={t} style={{padding: '12px 20px', borderRadius: 12, fontSize: 24, fontWeight: 700, background: i === (f >= 110 ? 1 : 0) ? C.acc : C.bg, border: `2px solid ${C.line}`}}>{t}</div>
            ))}
          </div>
        </div>
        {[['Keep-alive (koneksi nggak putus)', 150], ['Sync antar device', 210]].map(([t, s]) => (
          <div key={t as string} style={{...card, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{fontSize: 28, fontWeight: 700}}>{t}</div><Toggle on={f >= (s as number)} />
          </div>
        ))}
      </Win>
      <Caption text="Font, tema & sync: atur sekali, enak selamanya" />
    </AbsoluteFill>
  );
};

const Cta: React.FC = () => (
  <AbsoluteFill style={{fontFamily: FONT, alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 70}}>
    <Pop><div style={{fontSize: 90, fontWeight: 900, color: C.text, lineHeight: 1.15}}>Server rapi,<br />kerja ngebut ⚡</div></Pop>
    <Pop delay={20}><div style={{fontSize: 52, color: C.acc, fontWeight: 800, marginTop: 50}}>Follow {HANDLE}</div></Pop>
    <Pop delay={35}><div style={{fontSize: 40, color: C.mute, marginTop: 20}}>buat tips dev lainnya</div></Pop>
  </AbsoluteFill>
);

export const TermiusTikTok: React.FC = () => {
  let t = 0;
  const seq = (d: number, el: React.ReactElement) => { const s = <Sequence from={t} durationInFrames={d}>{el}</Sequence>; t += d; return s; };
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 20%, #1b2440, ${C.bg} 70%)`}}>
      <div style={{position: 'absolute', top: 50, right: 60, fontSize: 24, fontWeight: 800, color: C.mute, letterSpacing: '0.05em', opacity: 0.7, zIndex: 100, fontFamily: FONT}}>
        rhmt ofc
      </div>
      {seq(S.hook, <Hook />)}
      {seq(S.tour, <Tour />)}
      {seq(S.add, <AddHost />)}
      {seq(S.term, <Terminal />)}
      {seq(S.keys, <Keys />)}
      {seq(S.set, <Settings />)}
      {seq(S.cta, <Cta />)}
    </AbsoluteFill>
  );
};
