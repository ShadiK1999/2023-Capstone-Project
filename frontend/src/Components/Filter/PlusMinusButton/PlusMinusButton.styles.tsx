import { style } from 'typestyle';

export const Container = style({
  display: 'flex',
  height: '53px',
  width: '100%',
  alignItems: 'center',
  border: '1px solid black',
  borderRadius: '6px',
});

export const ButtonLeft = style({
  order: 1,
  alignSelf: 'stretch',
  width: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRight: '1px solid black',
  $nest: {
    '&:hover': {
      backgroundColor: '#BFCCB5',
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
    },
  },
});

export const ButtonContent = style({
  order: 2,
  flexGrow: 1,
  whiteSpace: 'nowrap',
  textAlign: 'center',
  padding: '0 15px',
});

export const ButtonRight = style({
  order: 3,
  alignSelf: 'stretch',
  width: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderLeft: '1px solid black',
  $nest: {
    '&:hover': {
      backgroundColor: '#BFCCB5',
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px',
    },
  },
});
