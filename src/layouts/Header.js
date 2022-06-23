import React,{useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { useThemeContext } from '../contexts/ThemeContext';
import { ReactComponent as LogoIcon } from '../assets/fig.svg';
import { ReactComponent as SunIcon } from '../assets/sun.svg';
import { ReactComponent as MoonIcon } from '../assets/moon.svg';
import LanguageSelector from '../components/LanguageSelector';
import { LanguageContext } from '../containers/Language';
import {languageFlags } from '../languages';


const headerStyle = (colors, isLight) => css`
  @media (max-width: 768px) {
    .overlay {
      display: flex;
      align-items: center;
      justify-content: start;
      flex-direction: column;
      gap: 25px;
      height: 100vh;
    }
    & > .overlay {
      .menu-item {
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: start;
      }
    }
  }
  & > nav {
    .hamburger {
      display: none;
    }
    @media (max-width: 768px) {
      .menu {
        display: none;
      }
      .hamburger {
        display: block;
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
      }
      .hamburger .line {
        display: block;
        width: 25px;
        height: 3px;
        background-color: ${colors.gray[8]};
        margin-block: 7px;
        border-radius: 4px;
        transition: transform 0.5s, opacity 0.25s;
      }
      .hamburger.active .line:nth-of-type(1) {
        transform: translateY(13px) rotate(45deg);
      }
      .hamburger.active .line:nth-of-type(2) {
        opacity: 0;
      }
      .hamburger.active .line:nth-of-type(3) {
        transform: translateY(-13px) rotate(-45deg);
      }
    }
    height: 100%;
    display: flex;
    padding: 0 12px;
    margin: 0 auto;
    max-width: 1280px;
    align-items: center;
    justify-content: space-between;

    .logo a {
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 2rem;
      font-weight: bold;
      text-decoration: none;
      text-transform: uppercase;

      margin-top: 10px;

      svg {
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
      }
    }
    svg {
      cursor: pointer;
      color: ${isLight ? 'inherit' : colors.gray[8]};
      fill: ${colors.gray[8]};
    }
    svg.theme {
      display: flex;
      user-select: none;
      color: ${isLight ? 'inherit' : colors.yellow[4]};
      fill: ${colors.yellow[4]};
    }
  }

  .top-nav {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .menu {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menu-item {
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 300;
  }
 .theme{
  margin-right:10px;
 }
`;

const Header = () => {
  const { userLanguage, dictionary } = useContext(LanguageContext);
  const { pathname } = useLocation();
  const { colors, isLight, toggleTheme } = useThemeContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    var hamburger = document.querySelector('.hamburger');
    if (isOpen == true) {
      hamburger.classList.add('active');
    } else {
      hamburger.classList.remove('active');
    }
  }, [isOpen]);

  return (
    <React.Fragment>
      <header css={[headerStyle(colors, isLight)]}>
        <nav>
          <div className="logo">
            <Link to="/" replace={pathname === '/'}>
              <LogoIcon />
              IT-BAHN
            </Link>
          </div>
          <div className="top-nav">
            <div className="menu">
              <Link className="menu-item" to="/" replace={pathname === '/'}>
                {dictionary.home}
              </Link>
              <Link className="menu-item" to="/about" replace={pathname === '/about'}>
                {dictionary.about}
              </Link>
              <Link className="menu-item" to="/services" replace={pathname === '/services'}>
                {dictionary.services}
              </Link>
              <Link className="menu-item" to="/contact-us" replace={pathname === '/contact-us'}>
                {dictionary.contact}
              </Link>
            </div>
            <img style={{width:"30px",height:"30px"}} src={languageFlags[userLanguage]} alt="lang flag"/>
            <LanguageSelector></LanguageSelector>
            {isLight ? (
              <SunIcon className="theme" onClick={toggleTheme} />
            ) : (
              <MoonIcon className="theme" onClick={toggleTheme} />
            )
            }
    
            <button type="button" className="hamburger" onClick={toggleMenu}>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </button>
          </div>
        </nav>
        {isOpen ? (
          <div className="overlay" data-aos="flip-down">
            <br />
            <br />
            <br />
            <Link className="menu-item" to="/" replace={pathname === '/'} onClick={toggleMenu}>
              {dictionary.home}
            </Link>
            <Link className="menu-item" to="/about" replace={pathname === '/about'} onClick={toggleMenu}>
              {dictionary.about}
            </Link>
            <Link className="menu-item" to="/services" replace={pathname === '/services'} onClick={toggleMenu}>
              {dictionary.services}
            </Link>
            <Link className="menu-item" to="/contact-us" replace={pathname === '/contact-us'} onClick={toggleMenu}>
              {dictionary.contact}
            </Link>
          </div>
        ) : null}
      </header>
    </React.Fragment>
  );
};

export default Header;
