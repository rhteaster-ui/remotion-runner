import React from 'react';

export const GeminiSparkle: React.FC<{size?: number; color?: string; style?: React.CSSProperties}> = ({
  size = 48,
  color = '#FF5E1E',
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{display: 'inline-block', flexShrink: 0, ...style}}
  >
    <path
      d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
      fill={color}
    />
  </svg>
);

export const AnthropicLogo: React.FC<{size?: number; color?: string; style?: React.CSSProperties}> = ({
  size = 40,
  color = '#D97706',
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{display: 'inline-block', flexShrink: 0, ...style}}
  >
    <path d="M14.2 3.2L18.9 14.5H15.1L14.2 12.1H9.8L8.9 14.5H5.1L9.8 3.2H14.2ZM12 6.4L10.8 9.6H13.2L12 6.4Z" />
    <circle cx="4.5" cy="19.5" r="1.8" />
    <circle cx="12" cy="19.5" r="1.8" />
    <circle cx="19.5" cy="19.5" r="1.8" />
  </svg>
);

export const OpenAILogo: React.FC<{size?: number; color?: string; style?: React.CSSProperties}> = ({
  size = 40,
  color = '#0D9488',
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{display: 'inline-block', flexShrink: 0, ...style}}
  >
    <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
    <path d="M12 6v12M6 12h12M7.75 7.75l8.5 8.5M16.25 7.75l-8.5 8.5" />
  </svg>
);

export const DeepMindLogo: React.FC<{size?: number; color?: string; style?: React.CSSProperties}> = ({
  size = 36,
  color = '#FFFFFF',
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{display: 'inline-block', flexShrink: 0, ...style}}
  >
    <rect x="3" y="3" width="7" height="7" rx="2" fill={color} opacity={0.9} />
    <rect x="14" y="3" width="7" height="7" rx="2" fill={color} opacity={0.6} />
    <rect x="3" y="14" width="7" height="7" rx="2" fill={color} opacity={0.6} />
    <rect x="14" y="14" width="7" height="7" rx="2" fill="#FF5E1E" />
  </svg>
);
