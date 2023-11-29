import { FC, ReactNode, useState, useEffect } from 'react';
import * as style from './Modal.styles';
import ReactDOM from 'react-dom';

type ModalProps = {
  title: string;
  children: ReactNode | string;
  isOpen: boolean;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({ title, children, isOpen, onClose }) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  if (!modalRoot || !isOpen) {
    return null;
  }

  const content = (
    <div className={style.Modal}>
      <h1>{title}</h1>
      {children}
      <a href="#" onClick={onClose}>
        Close
      </a>
    </div>
  );

  return ReactDOM.createPortal(content, modalRoot);
};

export { Modal };
