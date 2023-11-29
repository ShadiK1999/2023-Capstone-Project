import { style } from 'typestyle';

export const Component = style({
  $nest: {
    '& form': {
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      paddingTop: '40px',
    },
    '& input': {
      width: '100%',
      textOverflow: 'ellipsis',
      outline: 'none',
      lineHeight: '53px',
      paddingLeft: '20px',
      backgroundColor: '#E9ECEF',
      borderRadius: '6px',
      border: '1px solid #000000',
    },
    '& span': {
      marginLeft: '20px',
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
      $nest: {
        '&:hover': {
          backgroundColor: '#808a79',
        },
      },
    },
  },
});

export const InputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});
