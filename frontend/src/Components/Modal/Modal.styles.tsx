import { style, media } from 'typestyle';

export const Modal = style(
  {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '40%',
    maxWidth: '800px',
    minWidth: '650px',
    transform: 'translate(-50%, -50%)',
    padding: '30px 30px 80px',
    borderRadius: '6px',
    backgroundColor: '#E9ECEF',
    border: '1px solid black',
    $nest: {
      '& > a': {
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        marginTop: '0',
      },
      '& h1': {
        fontSize: '30px',
        textAlign: 'center',
        marginBottom: '20px',
        fontWeight: 600,
        color: '#7C96AB',
        margin: 0,
      },
    },
  },
  media(
    { maxWidth: 767 },
    {
      width: '100%',
    },
  ),
);
