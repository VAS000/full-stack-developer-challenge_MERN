import React from 'react';
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AUTHORS_PATH } from '../../router/routes/author';
import { BOOKS_PATH } from '../../router/routes/book';

const NavLink = styled(Link)`
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
              InfoXChange
            </Typography>
          
          <NavLink exact to={AUTHORS_PATH} activeClassName="active">Authors</NavLink>
          <NavLink exact to={BOOKS_PATH} activeClassName="active">Books</NavLink>

        </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
};

export default Navbar;