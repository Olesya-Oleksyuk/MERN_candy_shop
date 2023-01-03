import React from 'react';
import useBreakpoints from '../../hooks/useBreakpoints';

import { oldLavender } from '../../styles/colors.module.scss';
import './style.scss';

const AuthorizationScreenWrapper = ({ headerLogo: HeaderLogo, registerPage, children }) => {
  const viewport = useBreakpoints(window);
  const viewportsDesktop = ['lg', 'xl'];
  const viewportsMobile = ['md', 'sm', 'xs'];

  const registerPageGrid = registerPage ? 'authorization-grid--register-page' : '';

  return (
    <>
      <div className={`authorization-grid ${registerPageGrid}`}>
        <aside className="authorization-grid__aside-img position-relative">
          {viewportsMobile.includes(viewport)
          && (
            <>
              <p className="aside-img__header-logo position-absolute">
                <HeaderLogo fill={oldLavender} size={{ width: '58%', height: 'auto' }} />
              </p>
              <div className="candies-on-table" />
            </>
          )}
          {viewportsDesktop.includes(viewport)
          && (
            <>
              <div className="candies-on-table" />
            </>
          )}
        </aside>
        <main className="authorization-grid__authorization-content">
          {children}
        </main>
      </div>
    </>
  );
};

export default AuthorizationScreenWrapper;
