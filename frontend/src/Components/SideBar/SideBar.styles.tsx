import { style } from 'typestyle';

export const Container = style({
  backgroundColor: '#7C96AB',
  borderRadius: '6px',
  padding: '22px 14px',
  maxHeight: '100%',
  color: 'white',
});

export const InnerContainer = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  $nest: {
    '& > * + *': {
      marginTop: '16px',
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  overflowY: 'scroll',
  overflowX: 'hidden',
  scrollbarWidth: 'none',
});

export const Panel = style({
  backgroundColor: '#BFCCB5',
  borderRadius: '6px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  $nest: {
    '& > * + *': {
      marginTop: '2px',
    },
  },
  padding: '10px 16px',
  boxShadow: '2px 5px #888888',
});

export const Title = style({
  fontSize: '20px',
  fontWeight: 600,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

export const Address = style({
  fontSize: '20px',
  fontWeight: 400,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

export const SubtitlesPanel = style({
  display: 'grid',
  marginTop: '22px !important',
  gridTemplateColumns: '150px repeat(2, minmax(0, 1fr))',
  $nest: {
    '& > * + *': {
      marginLeft: '10px',
    },
  },
});

export const Subtitles = style({
  display: 'flex',
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
