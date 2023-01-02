import React from 'react';
import useBreakpoints from '../../hooks/useBreakpoints';

import { oldLavender } from '../../styles/colors.module.scss';
import './style.scss';

const LoginRegisterContainer = ({ headerLogo: HeaderLogo, registerPage, children }) => {
  const viewport = useBreakpoints(window);
  const viewportsDesktop = ['lg', 'xl'];
  const viewportsMobile = ['md', 'sm', 'xs'];

  const registerPageGrid = registerPage ? 'login-grid--register-page' : '';

  return (
    <>
      <div className={`login-grid ${registerPageGrid}`}>
        <div className="position-relative image-container">
          {viewportsMobile.includes(viewport)
          && (
            <>
              <p className="position-absolute login__login-logo">
                <HeaderLogo fill={oldLavender} size={{ width: '58%', height: 'auto' }} />
              </p>
              <div className="hero" />
            </>
          )}
          {viewportsDesktop.includes(viewport)
          && (
            <>
              <div className="hero" />
            </>
          )}
        </div>
        <main className="login-form">
          {children}
        </main>
      </div>
    </>
  );
};

export default LoginRegisterContainer;
