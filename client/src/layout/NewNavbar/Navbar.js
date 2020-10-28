import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { AUTHORS_PATH } from '../../router/routes/author';
import { NavLink } from './navComponents';
import { BOOKS_PATH } from '../../router/routes/book';

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