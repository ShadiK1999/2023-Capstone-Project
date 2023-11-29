import { style } from 'typestyle';

export const Container = (size: 'Small' | 'Large') => {
  const fontSize = size === 'Small' ? '36px' : '96px';
  const containerSize = size === 'Small' ? '58px' : '176px';
  return style({
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: fontSize,
    height: containerSize,
    width: containerSize,
    fontWeight: 700,
    lineHeight: containerSize,
    color: 'white',
    backgroundColor: '#DB7D7D',
    borderRadius: '50%',
    display: 'inline-block',
    cursor: 'pointer',
  });
};
