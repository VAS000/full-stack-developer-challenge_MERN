import React from 'react';
import { AUTHORS_PATH } from '../../router/routes/author';
import { Nav, NavLink, NavMenu, Bars} from './navComponents';

const Navbar = () => {

  // const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <Nav>
      <NavLink to="">
        <h1>logo</h1>
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink exact to={AUTHORS_PATH} activeClassName="active">Authors</NavLink>
        <NavLink exact to="/books" activeClassName="active">Books</NavLink>
      </NavMenu>
    </Nav>
  </>
  )
};

export default Navbar;