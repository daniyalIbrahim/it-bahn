import React,{useContext} from 'react';
import { css } from '@emotion/react';
import { useThemeContext } from '../contexts/ThemeContext';
import { ReactComponent as GithubIcon } from '../assets/github.svg';
import { Link, useLocation } from 'react-router-dom';
import { LanguageContext } from '../containers/Language';
const footerStyle = css`
  margin-top: 50px;
  width: 100vw;
  padding-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > nav {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      width: 2rem;
      height: 2rem;
    }
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menu-item {
    padding: 2px 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

const iconStyle = (color) => css`
  width: 2rem;
  height: 2rem;
  stroke: ${color};
`;

const Footer = () => {
  const { dictionary } = useContext(LanguageContext);
  const { isLight } = useThemeContext();
  const { pathname } = useLocation();

  return (
    <footer css={[footerStyle]}>
      <br />
      <br />
      <nav className="nav">
        <div className="nav-item">
          <Link className="menu-item" to="/impressum" replace={pathname === '/impressum'}>
            {dictionary.impress}
          </Link>

          <Link className="menu-item" to="/privacy-policy" replace={pathname === '/privacy-policy'}>
            {dictionary.ppolicy}
          </Link>
          <Link className="menu-item" to="/terms" replace={pathname === '/terms'}>
          {dictionary.terms}
          </Link>
        </div>
        <br />
        <br />
        <br />
        <div className="nav-item">{new Date().getFullYear()} &copy; SMR Group Sp.zo.o</div>
      </nav>
    </footer>
  );
};

export default Footer;
