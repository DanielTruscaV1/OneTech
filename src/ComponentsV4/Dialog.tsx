// Dialog.tsx
import React from 'react';
import './Dialog.css'; // Import your CSS file for dialog styles

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="dialog-overlay" onClick={handleOverlayClick}>
      <div className="dialog-content">
        <header className="dialog-header">
          <h2>{title}</h2>
        </header>
        <main className="dialog-body">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dialog;
