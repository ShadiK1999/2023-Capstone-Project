import { style } from 'typestyle';

export const Container = style({
  width: '100%',
  display: 'grid',
  marginTop: '75px',
  columnGap: '8px',
  rowGap: '30px',
  gridTemplateColumns: '1fr 400px',
  gridTemplateRows: '53px minmax(0, 1fr)',
});
