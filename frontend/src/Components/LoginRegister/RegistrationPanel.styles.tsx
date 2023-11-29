import { style } from 'typestyle';

export const Component = style({
  $nest: {
    '& form': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      gap: '40px',
      paddingTop: '40px',
    },
    '& input': {
      boxSizing: 'border-box',
      lineHeight: '53px',
      paddingLeft: '20px',
      border: '1px solid #000000',
      borderRadius: '6px',
      backgroundColor: '#E9ECEF',
    },
    '& input[type="checkbox"]': {
      marginRight: '10px',
      height: '25px',
      width: '25px',
    },
    '& span': {
      color: 'Red',
      fontSize: '15px',
      marginTop: '0px',
      fontWeight: 'bold',
      position: 'absolute',
      top: '100%',
      left: 0,
    },
    '& button': {
      height: '53px',
      backgroundColor: '#BFCCB5',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
  },
});

export const InputContainer = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
});
