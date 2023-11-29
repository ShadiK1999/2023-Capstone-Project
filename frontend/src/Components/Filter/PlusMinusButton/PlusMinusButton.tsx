import * as style from './PlusMinusButton.styles';
import filterIcon from './Assets/Filter.svg';
import plusIcon from './Assets/Plus.svg';
import minusIcon from './Assets/Minus.svg';

const Icons = {
  FILTER: filterIcon,
  PLUS: plusIcon,
  MINUS: minusIcon,
};

type IconName = keyof typeof Icons;

type ButtonAttributes = {
  icon?: IconName;
  onClick: () => void;
};

type ButtonProps = {
  leftButton?: ButtonAttributes;
  rightButton?: ButtonAttributes;
  children: React.ReactNode;
};

const defaultLeftButton: ButtonAttributes = {
  icon: 'MINUS',
  onClick: () => {},
};

const defaultRightButton: ButtonAttributes = {
  icon: 'PLUS',
  onClick: () => {},
};

const PlusMinusButton: React.FC<ButtonProps> = ({
  leftButton,
  rightButton,
  children,
}: ButtonProps) => {
  const { icon: leftIcon, onClick: leftOnClick } = Object.assign({}, defaultLeftButton, leftButton);
  const { icon: rightIcon, onClick: rightOnClick } = Object.assign(
    {},
    defaultRightButton,
    rightButton,
  );

  return (
    <div className={style.Container}>
      <div className={style.ButtonLeft} onClick={leftOnClick}>
        <img src={leftIcon && Icons[leftIcon]} alt={leftIcon && leftIcon} />
      </div>
      <div className={style.ButtonContent}>{children}</div>
      <div className={style.ButtonRight} onClick={rightOnClick}>
        <img src={rightIcon && Icons[rightIcon]} alt={rightIcon && rightIcon} />
      </div>
    </div>
  );
};

export { PlusMinusButton };
