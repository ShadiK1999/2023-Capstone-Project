import { style } from 'typestyle';

export const infoContainer = style({
  display: 'grid',
  gridTemplateRows: '2fr 4fr',
  color: 'white',
});

export const postInfoTitle = style({
  fontWeight: 'bold',
  paddingLeft: '5px',
  backgroundColor: '#ff3131',

  display: 'flex',
  alignItems: 'center',
});

export const neighbourInfoTitle = style({
  fontWeight: 'bold',
  padding: '5px',
  backgroundColor: '#0cc0df',

  display: 'flex',
  alignItems: 'center',
});

export const infoDataContainer = style({
  display: 'grid',
  gridTemplateRows: 'repeat(4, 1fr)',
  padding: '5px',
  color: 'black',
  backgroundColor: '#f5f5f5',
});

export const infoAddress = style({
  fontSize: '20px',
  fontWeight: 300,
  marginLeft: '2px',
});

export const infoData = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  $nest: {
    '&>img': {
      height: '24px',
      width: '24px',
    },
    '&>p': {
      fontSize: '15px',
      fontWeight: 300,
      marginLeft: '2px',
    },
  },
});
