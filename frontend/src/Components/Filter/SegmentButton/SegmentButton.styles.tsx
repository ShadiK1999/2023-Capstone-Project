import { style } from 'typestyle';

export const container = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'flex-start',
  width: '100%',
  borderRadius: '6px',
  border: '1px solid black',
});

export const button = style({
  width: '100%',
  height: '50px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  $nest: {
    '&:hover': {
      backgroundColor: '#BFCCB5',
    },
    '&:first-child': {
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
    },
    '&:last-child': {
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px',
    },
  },
});

export const buttonSelected = style({
  width: '100%',
  height: '50px',
  backgroundColor: '#BFCCB5',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  $nest: {
    '&:first-child': {
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
    },
    '&:last-child': {
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px',
    },
  },
});
