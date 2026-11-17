import React from 'react';

export type IP = {c: string; s?: number};
export type IconKey =
  | 'user' | 'chat' | 'check' | 'server' | 'code' | 'search' | 'terminal' | 'users'
  | 'refresh' | 'dash' | 'bolt' | 'lock' | 'plus' | 'minus' | 'fit' | 'play' | 'arrowUp' | 'spinner';

const mk = (children: React.ReactNode, fill = false): React.FC<IP> => ({c, s = 48}) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill={fill ? c : 'none'}
    stroke={c}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const ICONS: Record<IconKey, React.FC<IP>> = {
  user: mk(<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></>),
  chat: mk(<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />),
  check: mk(<polyline points="20 6 9 17 4 12" />),
  server: mk(<><rect x="3" y="4" width="18" height="6" rx="2" /><rect x="3" y="14" width="18" height="6" rx="2" /><circle cx="7" cy="7" r="1" fill="currentColor" /><circle cx="7" cy="17" r="1" fill="currentColor" /></>),
  code: mk(<><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>),
  search: mk(<><circle cx="11" cy="11" r="7" /><line x1="20" y1="20" x2="16.2" y2="16.2" /></>),
  terminal: mk(<><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></>),
  users: mk(<><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17.5" cy="9" r="2.4" /><path d="M17 14.2c2.6.2 4.5 2.3 4.5 5" /></>),
  refresh: mk(<><path d="M20 11a8 8 0 0 0-14-4.5L4 9" /><path d="M4 4v5h5" /><path d="M4 13a8 8 0 0 0 14 4.5L20 15" /><path d="M20 20v-5h-5" /></>),
  dash: mk(<><rect x="3" y="3" width="8" height="9" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" /><rect x="13" y="12" width="8" height="9" rx="1.5" /><rect x="3" y="16" width="8" height="5" rx="1.5" /></>),
  bolt: mk(<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />, true),
  lock: mk(<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>),
  plus: mk(<path d="M12 5v14M5 12h14" />),
  minus: mk(<path d="M5 12h14" />),
  fit: mk(<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />),
  play: mk(<polygon points="6 4 20 12 6 20 6 4" />, true),
  arrowUp: mk(<><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></>),
  spinner: mk(<path d="M21 12a9 9 0 1 1-6.2-8.55" />),
};
