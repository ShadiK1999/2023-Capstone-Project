import { style } from 'typestyle';

export const Component = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '80px',
  backgroundColor: '#7C96AB',
  padding: '15px 30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const Left = style({
  marginLeft: '10px',
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Logo = style({
  cursor: 'pointer',
  padding: '10% 0',
});

export const Registration = style({
  marginRight: '10px',
  display: 'flex',
  gap: '20px',
});
