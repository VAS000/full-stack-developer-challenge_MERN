import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

export const Nav = styled.nav`
  background: #000;
  height: 70px;
  display: flex;
  z-index: 9;
  justsify-content: space-between;
  padding: 0.5rem calc((100vw - 9600px) / 2);
`

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  text-decoration: none;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  cursor: pointer;

  &.active {
    color: #14cffc;
  }
`

export const Bars = styled(MenuIcon)`
  color: #fff;
  display: none !important;

  @media screen and (max-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    display: block !important;
    cursor: pointer;
    font-size: 1.7rem;
    transform: translate(-100%, 75%);
  }
`

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`