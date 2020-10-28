import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import $style from './Navbar.module.scss';

const NavbarLinks = [{
  text: 'Home',
  url: '#'
}, {
  text: 'Authors',
  url: '#'
}, {
  text: 'Books',
  url: '#'
}]

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={$style.Navbar}>
      <h1 className={$style.header}>InfoXchange</h1>
      <div className={$style.burgerMenu} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <MenuIcon style={{fill: "#fff"}}/>: <CloseIcon style={{fill: "#fff"}}/>}
      </div>
      <ul className={$style.menu}>
        {NavbarLinks.map(link => (
          <li><a className={$style.link} href={link.url}>{link.text}</a></li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar;