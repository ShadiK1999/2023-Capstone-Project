import { keyframes, style } from 'typestyle';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const Loader = style({
  border: '16px solid #f3f3f3',
  borderTop: '16px solid #3498db',
  borderRadius: '50%',
  animation: `${spin} 2s linear infinite`,
  width: '120px',
  height: '120px',
});
