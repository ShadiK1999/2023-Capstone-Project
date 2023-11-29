import { style } from 'typestyle';

export const Container = style({
  border: '1px solid black',
  borderRadius: '6px',
  display: 'flex',
  width: '100%',

  $nest: {
    '& * + *': {
      marginLeft: '16px',
      marginRight: '16px',
      width: '100%',
    },
  },
});

export const IconContainer = style({
  height: '53px',
  width: '53px',
  padding: '12px',
  borderRightStyle: 'solid',
  border: '1px black',
  cursor: 'pointer',
});

export const Input = style({
  textOverflow: 'ellipsis',
  border: 'none',
  outline: 'none',
  width: '100%',
  height: '100%',
});
