import { style } from 'typestyle';

export const CardContainer = style({
  backgroundColor: '#bfccb5',
  borderRadius: '6px',
  padding: '20px',
  width: 'fit-content',
  height: 'fit-content',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
});

export const UserInfoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'left',
  gap: '5px',
  paddingLeft: '30px',
});

export const UserName = style({
  fontSize: '1.2rem',
});

export const UserInfo = style({
  fontSize: '0.85rem',
});
