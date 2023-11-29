import { style } from 'typestyle';

export const Container = style({
  $nest: {
    '& td': {
      borderBottom: '1pt solid #000000',
      paddingTop: '75px',
      paddingBottom: '75px',
    },
    '& th': {
      textAlign: 'start',
      borderBottom: '1pt solid #000000',
      paddingBottom: '36px',
      paddingTop: '36px',
    },
  },
  width: '100%',
  borderCollapse: 'collapse',
});

export const VerifiedBadge = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const IconDiv = style({
  display: 'flex',
  gap: '34px',
});

export const ViewModalContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const DayContainer = style({
  paddingLeft: '12px',
});
