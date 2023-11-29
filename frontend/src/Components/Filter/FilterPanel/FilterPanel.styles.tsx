import { style } from 'typestyle';

export const panel = style({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  top: '110%',
  left: '0',
  width: '150%',
  padding: '15px',
  border: '1px solid black',
  backgroundColor: 'white',
  borderRadius: '5px',
  zIndex: 1,
});
