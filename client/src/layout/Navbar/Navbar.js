import React from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AUTHORS_PATH } from '../../router/routes/author';
import { BOOKS_PATH } from '../../router/routes/book';
import { HOME_PATH } from '../../router/routes/home';

const StyledNavLink = styled(NavLink)`
  color: #fff;
  display: flex;
  text-decoration: none;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  cursor: pointer;

  &.active {
    color: yellow;
  }
`;

const StyledLink = styled(Link)`
  color: #fff;
  display: flex;
  text-decoration: none;
  align-items: center;
  padding: 0 1rem;
  cursor: pointer;
`


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
});

const Navbar = () => {

  const classes = useStyles();

  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar>
        <Container maxWidth="md">
        <Toolbar>
          {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" color="inherit" className={classes.grow}>
              <StyledLink exact to={HOME_PATH}>InfoXChange</StyledLink>
            </Typography>
          
          <StyledNavLink exact to={AUTHORS_PATH} activeClassName="active">Authors</StyledNavLink>
          <StyledNavLink exact to={BOOKS_PATH} activeClassName="active">Books</StyledNavLink>

        </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
};

export default Navbar;