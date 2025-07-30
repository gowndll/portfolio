// components/Modal.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
      <button type="button" className="btn-close" onClick={() => onClose()}>
        <i className="ri-close-line"></i>
      </button>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default Modal;
