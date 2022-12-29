import React from 'react';
import './style.scss';

const ButtonWelcome = ({ className = '', onClick, children }) => (
  <button className={`welcome-button ${className}`} onClick={onClick}>{children}</button>
);

export default ButtonWelcome;
